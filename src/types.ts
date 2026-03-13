export type ProductCategory = 'Skincare' | 'Makeup';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
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
