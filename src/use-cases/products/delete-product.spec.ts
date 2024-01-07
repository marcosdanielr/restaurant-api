import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteProductUseCase } from "./delete-product";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let productsRepository: InMemoryIProductsRepository;
let restaurantsRepository: InMemoryIRestaurantsRepository;
let categoriesRepository: InMemoryICategoriesRepository;
let sut: DeleteProductUseCase;

describe("Delete Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryIProductsRepository();
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    categoriesRepository = new InMemoryICategoriesRepository();

    sut = new DeleteProductUseCase(productsRepository);
  });

  it("should be able to delete product", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await categoriesRepository.create(restaurant_id, {
      name: "Bebidas",
    });

    const { id: category_id } = categoriesRepository.categories[0];

    await productsRepository.create(restaurant_id, {
      name: "Monster",
      category_id: category_id,
      price: 9.50
    });

    const product = productsRepository.products[0];

    await sut.execute({
      restaurant_id,
      id: product.id
    });

    expect(productsRepository.products.length).toEqual(0);
  });
});
