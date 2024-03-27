CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "restaurants" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "image_path" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_restaurants PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "image_path" VARCHAR(255),
  "price" DECIMAL NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_products PRIMARY KEY (id)
);
