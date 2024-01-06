export type Product = {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  image_path?: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateProductInput = {
  category_id: string;
  name: string;
  image_path?: string;
  price: number;
};

export type UpdateProductInput = {
  category_id?: string;
  name?: string;
  image_path?: string;
  price?: number;
};
