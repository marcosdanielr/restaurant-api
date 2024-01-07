import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { ListRestaurantProductsUseCase } from "./list-restaurant-products";

let IProductsRepository: InMemoryIProductsRepository;
let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let ICategoriesRepository: InMemoryICategoriesRepository;
let sut: ListRestaurantProductsUseCase;

describe("List Restaurant Products Use Case", () => {
  beforeEach(() => {
    IProductsRepository = new InMemoryIProductsRepository();
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    ICategoriesRepository = new InMemoryICategoriesRepository();

    sut = new ListRestaurantProductsUseCase(IProductsRepository);
  });

  it("should be able to list products by restaurant id", async () => {
    await IRestaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });


    await IRestaurantsRepository.create({
      name: "Lanchonete - 2",
      address: "Avenida",
    });

    const { id: first_restaurant_id } = IRestaurantsRepository.restaurants[0];
    const { id: second_restaurant_id } = IRestaurantsRepository.restaurants[1];

    await ICategoriesRepository.create(first_restaurant_id, {
      name: "Bebidas",
    });


    await ICategoriesRepository.create(second_restaurant_id, {
      name: "Almoço",
    });

    const { id: category_id } = ICategoriesRepository.categories[0];

    for (let i = 0; i < 6; i++) {
      await IProductsRepository.create(first_restaurant_id, {
        category_id,
        name: `product-${i}`, 
        price: i,
      });
    }

    for (let i = 0; i < 4; i++) {
      await IProductsRepository.create(second_restaurant_id, {
        category_id,
        name: `product-${i}`, 
        price: i,
      });
    }


    const { products } = await sut.execute({
      restaurant_id: first_restaurant_id
    });

    expect(products.length).toEqual(6);
    expect(products).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          restaurant_id: second_restaurant_id
        })
      ])
    );
  });
});
