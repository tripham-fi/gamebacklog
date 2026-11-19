import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { BACKLOG_STATUSES } from "../constants/types";

export const games = sqliteTable("games", {
  id: int("id").primaryKey({ autoIncrement: true }),
  gameID: text().notNull().unique(),
  steamAppID: text(),
  title: text().notNull(),
  thumb: text(),
  status: text({ enum: BACKLOG_STATUSES }).notNull().default("not_own"),
  targetPrice: real(),
  priceWhenAdded: real(),
  lastPrice: real(),
  addedAt: text().notNull().$defaultFn(() => new Date().toISOString()),
  completedAt: text(),
});

export const settings = sqliteTable("settings", {
  key: text().primaryKey(),
  value: text().notNull(),
});

export type GameBacklog = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
