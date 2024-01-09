import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { CreatePromotionUseCase } from "./create-promotion";
import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InvalidTimeFormatError } from "../errors/invalid-time-format-error";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";
import { PromotionAlreadyExistsError } from "../errors/promotion-already-exists-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let productsRepository: InMemoryProductsRepository;
let promotionsRepository: InMemoryPromotionsRepository;
let sut: CreatePromotionUseCase;

describe("Create Promotion Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    productsRepository = new InMemoryProductsRepository();
    promotionsRepository = new InMemoryPromotionsRepository();
    sut = new CreatePromotionUseCase(promotionsRepository);
  });

  it("should be able to create promotion", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
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
        id: expect.any(String),
        product_id, 
        price: 7.50,
        description: "Promoção!",
        weekday: "SUNDAY",
        start_time: "08:10",
        end_time: "18:00",
        created_at: expect.any(Date)
      })
    );
  });

  it("shouldn't able to create promotion if has invalid weekday", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
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

    await expect(() => 
      sut.execute({
        product_id, 
        price: 7.50,
        description: "Promoção!",
        weekday: "TEST" as any,
        start_time: "08:10",
        end_time: "18:00"
      })
    ).rejects.toBeInstanceOf(InvalidWeekdayError);
  });

  it("shouldn't able to create promotion if already exists", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
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

    await expect(() => 
      sut.execute({
        product_id, 
        price: 7.50,
        description: "Promoção!",
        weekday: "SUNDAY",
        start_time: "08:10",
        end_time: "18:00"
      })
    ).rejects.toBeInstanceOf(PromotionAlreadyExistsError);
  });

  it("shouldn't able to create opening hours if time format be different than HH:mm", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
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

    await expect(() => 
      sut.execute({
        product_id, 
        price: 7.50,
        description: "Promoção!",
        weekday: "SUNDAY",
        start_time: "08h10",
        end_time: "18:00"
      })
    ).rejects.toBeInstanceOf(InvalidTimeFormatError);
  });
});
