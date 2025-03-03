import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";

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
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  tagType: tagTypes().notNull(),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const tagRelations = relations(tag, ({ many }) => ({
  authors: many(authorToTags),
  works: many(workToTags),
}));

export const author = pgTable("author", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
});

export const authorRelations = relations(author, ({ many }) => ({
  tags: many(authorToTags),
}));

export const work = pgTable("work", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  authorId: uuid("author_id").notNull().references(() => author.id),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const workRelations = relations(work, ({ many }) => ({
  tags: many(workToTags),
}));

export const note = pgTable("note", {
  id: uuid().defaultRandom().primaryKey(),
  content: text().default(""),
  createdAt: date().defaultNow(),
  updatedAt: date()
    .defaultNow()
    .$onUpdate(() => Date()),
});

export const noteRelations = relations(note, ({ one }) => ({
  user: one(user),
  work: one(work),
}));

export const authorToTags = pgTable("author_to_tags", {
  authorId: uuid("author_id")
    .notNull()
    .references(() => author.id),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tag.id),
}, (t) => [
  primaryKey({ columns: [t.authorId, t.tagId] }),
]);

export const workToTags = pgTable("work_to_tags", {
  workId: uuid("work_id")
    .notNull()
    .references(() => work.id),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tag.id),
}, (t) => [
  primaryKey({ columns: [t.workId, t.tagId] }),
]);