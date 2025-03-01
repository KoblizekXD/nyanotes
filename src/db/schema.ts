import { date, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text(),
  email: text(),
  emailVerified: text(),
  image: text(),
  createdAt: date(),
  updatedAt: date(),
});

export const session = pgTable("session", {
  id: text().primaryKey(),
  userId: text().references(() => user.id),
  token: text(),
  expiresAt: date(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: date(),
  updatedAt: date(),
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
  createdAt: date(),
  updatedAt: date(),
});

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text(),
  value: text(),
  expiresAt: date(),
  createdAt: date(),
  updatedAt: date(),
});
