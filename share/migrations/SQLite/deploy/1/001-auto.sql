--
-- Created by SQL::Translator::Producer::SQLite
-- Created on Tue Sep 24 15:48:36 2024
--

;
BEGIN TRANSACTION;
--
-- Table: "flights"
--
CREATE TABLE "flights" (
  "id" INTEGER PRIMARY KEY NOT NULL,
  "board" text NOT NULL,
  "time" text NOT NULL,
  "destination" text NOT NULL,
  "flight" text NOT NULL,
  "area" text
);
--
-- Table: "history"
--
CREATE TABLE "history" (
  "id" INTEGER PRIMARY KEY NOT NULL,
  "board" text NOT NULL,
  "time" int NOT NULL,
  "destination" text NOT NULL,
  "flight" text NOT NULL,
  "state" int DEFAULT 0,
  "area" text,
  "created" int NOT NULL,
  "modified" int NOT NULL
);
COMMIT;
