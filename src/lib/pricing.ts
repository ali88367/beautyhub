function trimPrice(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function formatPriceLabel(value: string): string {
  const cleaned = trimPrice(value);
  if (!cleaned) return cleaned;
  if (/^(rs\.?|rs|pkr)\b/i.test(cleaned)) {
    return cleaned.replace(/^(pkr|rs\.?)/i, 'Rs');
  }
  return `Rs ${cleaned}`;
}
