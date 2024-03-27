export type Restaurant = {
    id: string;
    name: string;
    image_path?: string;
    created_at: Date;
    updated_at: Date;
  }
  
export type CreateRestaurantRequest = {
    name: string;
    image_path?: string;
  } 
  
export type UpdateRestaurantRequest = {
    name?: string;
    image_path?: string;
  } 
