export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: string;
  title: string;
}

export type Currencies = string[];

export interface Category {
  href: string;
  imageAlt: string;
  imageSrc: string;
  name: string;
}

export interface NavigationCategory {
  featured: Category[];
  name: string;
}

export interface Page {
  href: string;
  name: string;
}

export interface ProductsResponse 
