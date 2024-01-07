import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateProductUseCase } from "./update-product";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let productsRepository: InMemoryIProductsRepository;
let restaurantsRepository: InMemoryIRestaurantsRepository;
let ICategoriesRepository: InMemoryICategoriesRepository;
let sut: UpdateProductUseCase;

describe("Update Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryIProductsRepository();
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    ICategoriesRepository = new InMemoryICategoriesRepository();

    sut = new UpdateProductUseCase(productsRepository);
  });

  it("should be able to update product", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await ICategoriesRepository.create(restaurant_id, {
      name: "Bebidas",
    });

    const { id: category_id } = ICategoriesRepository.categories[0];


    await productsRepository.create(restaurant_id, {
      category_id,
      name: "Monster",
      price: 9.5,
      image_path: "image_path/blabla.png"
    });

    const product = productsRepository.products[0];


    await sut.execute({
      restaurant_id,
      id: product.id,
      body: {
        name: "Monster Promotion!",
        category_id,
        price: 8.0,
      },
    });

    const productUpdated = productsRepository.products[0];

    expect(product.name).not.toEqual(productUpdated.name);
    expect(productUpdated.name).toEqual("Monster Promotion!");
  });
});
