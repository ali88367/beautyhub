import { Product, ProductCategory } from '../types';

export const CATEGORY_OPTIONS: ProductCategory[] = [
  'Makeup',
  'Foundations',
  'Serum',
  'Skincare',
  'Lipsticks',
  'Hair Care',
];

const productFiles = import.meta.glob('/content/products/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function cleanScalar(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(value: string): string | boolean {
  const cleaned = cleanScalar(value);
  if (cleaned === 'true') return true;
  if (cleaned === 'false') return false;
  return cleaned;
}

function parseFrontMatter(frontMatter: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  const lines = frontMatter.replace(/\r\n/g, '\n').split('\n');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line || !line.trim() || line.trim().startsWith('#')) {
      i += 1;
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      i += 1;
      continue;
    }

    const [, key, rest] = match;

    if (rest === '|' || rest === '|-' || rest === '>' || rest === '>-') {
      i += 1;
      const block: string[] = [];
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
        block.push(lines[i].replace(/^  /, ''));
        i += 1;
      }
      data[key] = block.join('\n').trim();
      continue;
    }

    if (rest === '') {
      i += 1;
      const list: unknown[] = [];

      while (i < lines.length && lines[i].match(/^\s*-/)) {
        const item = lines[i].replace(/^\s*-\s*/, '');
        if (item.includes(':')) {
          const objMatch = item.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          if (objMatch) {
            list.push({ [objMatch[1]]: parseScalar(objMatch[2]) });
          }
        } else {
          list.push(parseScalar(item));
        }
        i += 1;
      }

      if (list.length > 0) {
        data[key] = list;
        continue;
      }

      const block: string[] = [];
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
        block.push(lines[i].replace(/^  /, ''));
        i += 1;
      }
      data[key] = block.join('\n').trim();
      continue;
    }

    data[key] = parseScalar(rest);
    i += 1;
  }

  return data;
}

function toProduct(path: string, markdown: string): Product | null {
  const frontMatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*/);
  if (!frontMatterMatch) return null;

  const fields = parseFrontMatter(frontMatterMatch[1]);
  const slug = path.split('/').pop()?.replace(/\.md$/, '') || crypto.randomUUID();
  const categoryRaw = String(fields.category ?? 'Skincare');
  const category = CATEGORY_OPTIONS.includes(categoryRaw as ProductCategory)
    ? (categoryRaw as ProductCategory)
    : 'Skincare';

  const imagesRaw = Array.isArray(fields.images) ? fields.images : [];
  const images = imagesRaw
    .map((entry) => {
      if (typeof entry === 'string') return entry;
      if (entry && typeof entry === 'object' && 'item' in entry) {
        return String((entry as { item: unknown }).item);
      }
      return '';
    })
    .filter(Boolean);

  const name = String(fields.product_name ?? '').trim();
  const price = String(fields.price ?? '').trim();

  if (!name || !price) return null;

  return {
    id: slug,
    slug,
    name,
    price,
    description: String(fields.description ?? '').trim(),
    category,
    bestSeller: Boolean(fields.best_seller ?? false),
    images,
  };
}

export function getAllProducts(): Product[] {
  return Object.entries(productFiles)
    .map(([path, markdown]) => toProduct(path, markdown))
    .filter((product): product is Product => product !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}
