CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`username` text NOT NULL,
	`photo` text DEFAULT '/none.svg',
	`user_id` text NOT NULL,
	`date_created` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`measure` text NOT NULL,
	`points` integer NOT NULL,
	`category` integer,
	`photo` text,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`description` text,
	`short_description` text,
	`user_id` text NOT NULL,
	`date_created` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`points` integer NOT NULL,
	`photo` text,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`description` text,
	`short_description` text,
	`user_id` text NOT NULL,
	`date_created` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`points` integer NOT NULL,
	`measure` text NOT NULL,
	`amount` text NOT NULL,
	`photo` text,
	`notes` text,
	`kind` text,
	`status` text,
	`user_id` text NOT NULL,
	`date_accepted` integer,
	`date_cancelled` integer,
	`date_transferred` integer,
	`date_modified` integer,
	`date_created` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`codename` text,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`pin` integer,
	`phone` text,
	`email` text,
	`avatar` text DEFAULT '/avatar.svg',
	`date_created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_codename_unique` ON `users` (`codename`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);