export class RestaurantAddressAlreadyExistsError extends Error {
  constructor() {
    super("Restaurant address already exists!");
  }
}
