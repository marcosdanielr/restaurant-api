import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";
import { WeekdayAlreadyExistsError } from "../errors/weekday-already-exists-error";
import { InvalidTimeFormatError } from "../errors/invalid-time-format-error";
import { MinimumIntervalTimeError } from "../errors/minimum-interval-time-error";
import { InMemoryIPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { CreatePromotionUseCase } from "./create-promotion";
import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let restaurantsRepository: InMemoryIRestaurantsRepository;
let categoriesRepository: InMemoryICategoriesRepository;
let productsRepository: InMemoryIProductsRepository;
let promotionsRepository: InMemoryIPromotionsRepository;
let sut: CreatePromotionUseCase;

describe("Create Promotion Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    categoriesRepository = new InMemoryICategoriesRepository();
    productsRepository = new InMemoryIProductsRepository();
    promotionsRepository = new InMemoryIPromotionsRepository();
    sut = new CreatePromotionUseCase(promotionsRepository);
  });

  it("should be able to create promotion", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await categoriesRepository.create(restaurant_id, {
      name: "Bebidas"
    });

    const { id: category_id} = categoriesRepository.categories[0];

    await productsRepository.create(restaurant_id, {
      name: "Monster",
      price: 9.50,
      category_id
    });

    const { id: product_id } = productsRepository.products[0];

    await sut.execute({
      product_id, 
      price: 7.50,
      description: "Promoção!",
      weekday: "SUNDAY",
      start_time: "08:10",
      end_time: "18:00"
    });

    const promotion = promotionsRepository.promotions[0];

    expect(promotion).toEqual(
      expect.objectContaining({
        product_id, 
        price: 7.50,
        description: "Promoção!",
        weekday: "SUNDAY",
        start_time: "08:10",
        end_time: "18:00"
      })
    );
  });

});
