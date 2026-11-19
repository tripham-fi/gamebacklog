import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const DATABASE_NAME = "backlogdb.db";
export const expoDb = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb);