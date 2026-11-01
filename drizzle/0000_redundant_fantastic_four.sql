CREATE TABLE `demo_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`institution` text NOT NULL,
	`role` text NOT NULL,
	`country` text NOT NULL,
	`topic` text NOT NULL,
	`notes` text NOT NULL,
	`consent` integer NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `demo_requests_reference_unique` ON `demo_requests` (`reference`);