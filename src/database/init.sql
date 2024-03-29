CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "restaurants" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "image_path" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_restaurants PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "restaurant_addresses" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid UNIQUE NOT NULL,
  "city" VARCHAR(28) NOT NULL,
  "state" VARCHAR(2) NOT NULL,
  "street" VARCHAR(50) NOT NULL,
  "district" VARCHAR(50) NOT NULL,
  "number" VARCHAR(20) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_restaurant_addresses PRIMARY KEY (id),
  CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_categories PRIMARY KEY (id),
  CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id" uuid NOT NULL,
  "category_id" uuid NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "image_path" VARCHAR(255),
  "price" DECIMAL NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_products PRIMARY KEY (id),
  CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
