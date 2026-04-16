import { Category } from '../category/category';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;

  category?: Category | null;
}
