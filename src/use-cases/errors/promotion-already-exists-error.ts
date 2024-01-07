export class PromotionAlreadyExistsError extends Error {
  constructor() {
    super("Promotion already exists!");
  }
}
