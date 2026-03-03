export type ProductCategory = 'Skincare' | 'Hair Care';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  category: ProductCategory;
  bestSeller: boolean;
  images: string[];
}

export interface CategoryOption {
  id: ProductCategory;
  name: ProductCategory;
}

// Legacy category shape retained for existing component compatibility.
export interface Category {
  id: string;
  name: string;
  image: string;
}
