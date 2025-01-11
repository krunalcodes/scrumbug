import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  domain: varchar('domain').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const teamRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
}));

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  emailVerified: boolean('email_verified').default(false),
  avatar: varchar('avatar', { length: 255 }),
  timeZone: varchar('time_zone', { length: 255 }),
  isOnboardingComplete: boolean('is_onboarding_completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  memberships: many(teamMembers),
}));

export const userRoles = pgEnum('user_roles', ['ADMIN', 'MEMBER']);

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  teamId: integer('team_id')
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
  role: userRoles('role').default('MEMBER'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const memberRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
}));

export const tokenTypes = pgEnum('token_types', [
  'EMAIL_VERIFICATION',
  'PASSWORD_RESET',
]);

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 255 }).unique().notNull(),
  type: tokenTypes('type').notNull(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expires_at: timestamp('expires_at'),
});

export const tokenRelations = relations(tokens, ({ one }) => ({
  user: one(users, { fields: [tokens.userId], references: [users.id] }),
}));

export const databaseSchema = {
  teams,
  teamRelations,
  users,
  userRelations,
  userRoles,
  teamMembers,
  memberRelations,
  tokenTypes,
  tokens,
  tokenRelations,
};
