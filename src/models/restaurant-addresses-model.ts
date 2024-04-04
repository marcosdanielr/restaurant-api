export type RestaurantAddress = {
  id: string;
  restaurant_id: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: string;
  created_at: Date;
  updated_at: Date;
}


export type CreateRestaurantAddressRequest = {
  restaurant_id: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: string;
}

export type UpdateRestaurantAddressRequest = {
  city?: string;
  state?: string;
  street?: string;
  district?: string;
  number?: string;
}
