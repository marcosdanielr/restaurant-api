export class RestaurantAddressNotFoundError extends Error {
  constructor() {
    super("Restaurant address not found!");
  }
}
