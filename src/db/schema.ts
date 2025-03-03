import { boolean, date, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text(),
  email: text(),
  emailVerified: text(),
  image: text(),
  finishedOnboarding: boolean(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const session = pgTable("session", {
  id: text().primaryKey(),
  userId: text().references(() => user.id),
  token: text(),
  expiresAt: date(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const account = pgTable("account", {
  id: text().primaryKey(),
  userId: text().references(() => user.id),
  accountId: text(),
  providerId: text(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: date(),
  refreshTokenExpiresAt: date(),
  scope: text(),
  idToken: text(),
  password: text(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text(),
  value: text(),
  expiresAt: date(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const tagTypes = pgEnum("tag_type", [
  "unknown",
  "era",
  "genre",
  "format",
  "theme",
]);

export const tag = pgTable("tag", {
  id: text().primaryKey(),
  name: text().notNull(),
  tagType: tagTypes().notNull(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const author = pgTable("author", {
  id: text().primaryKey(),
  name: text(),
  tags: text()
    .array()
    .references(() => tag.id),
  notes: text()
    .array()
    .references(() => note.id),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const work = pgTable("work", {
  id: text().primaryKey(),
  title: text(),
  authors: text()
    .array()
    .references(() => author.id),
  tags: text()
    .array()
    .references(() => tag.id),
  notes: text()
    .array()
    .references(() => note.id),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const note = pgTable("note", {
  id: text().primaryKey(),
  userId: text().references(() => user.id),
  title: text(),
  content: text(),
  tags: text()
    .array()
    .references(() => tag.id),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});
