import { app } from "@/app";
import { CreatePromotionRequest } from "@/models/promotions-model";
import { IPromotionsRepository } from "../promotions-repository";
import { Weekday } from "@/types/weekday";

export class PostgreSQLPromotionsRepository implements IPromotionsRepository {
  async create(body: CreatePromotionRequest) {
      
  }

  async getByWeekday(product_id_req: string, weekday_req: Weekday) {
    const product_id = product_id_req;
    const weekday = weekday_req;
  
    const { rows } = await app.pg.query(
      "SELECT * FROM promotions WHERE product_id = $1 AND weekday = $2 LIMIT 1",
      [product_id, weekday]
    );

    const [ promotion ] = rows;

    return promotion || null;
      
  }
}
