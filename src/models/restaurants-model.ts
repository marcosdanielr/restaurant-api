export type Restaurant = {
    id: string;
    name: string;
    image_path?: string;
    address: string;
    created_at: Date;
    updated_at: Date;
  }
  
export type CreateRestaurantRequest = {
    name: string;
    image_path?: string;
    address: string;
  } 
  
export type UpdateRestaurantRequest = {
    name?: string;
    image_path?: string;
    address?: string;
  }
  