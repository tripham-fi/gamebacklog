CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`gameID` text NOT NULL,
	`steamAppID` text,
	`title` text NOT NULL,
	`thumb` text,
	`status` text DEFAULT 'not_own' NOT NULL,
	`targetPrice` real,
	`priceWhenAdded` real,
	`lastPrice` real,
	`addedAt` text NOT NULL,
	`completedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `games_gameID_unique` ON `games` (`gameID`);