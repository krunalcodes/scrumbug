import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { databaseSchema, teamMembers, teams, users } from './database-schema';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import slugify from 'slugify';

const main = async () => {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false,
  });
  const db = drizzle(pool, { schema: databaseSchema });

  console.log('🌱 Database seeding started...');

  console.log('⚙️ Seeding teams...');
  const teamRecords = [];
  for (let i = 0; i < 5; i++) {
    const name = faker.company.name();
    const domain = slugify(name, { lower: true, strict: true, trim: true });
    const team = {
      name,
      domain,
    };
    teamRecords.push(team);
  }

  const createdTeams = await db.insert(teams).values(teamRecords).returning();
  console.log(`✔️ ${teamRecords.length} teams seeded.`);

  console.log('⚙️ Seeding users...');
  const userRecords = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.person.firstName();
    const hashedPassword = await bcrypt.hash('Password123#', 12);
    const user = {
      name: name,
      displayName: name,
      email: faker.internet.email().toLowerCase(),
      password: hashedPassword,
      emailVerified: true,
      timeZone: faker.location.timeZone(),
      isOnboardingComplete: faker.datatype.boolean(),
    };
    userRecords.push(user);
  }

  const createdUser = await db.insert(users).values(userRecords).returning();
  console.log(`✔️ ${userRecords.length} users seeded.`);

  console.log('⚙️ Seeding team memberships...');
  const teamMemberRecords = [];
  for (let i = 0; i < 15; i++) {
    const randomUserId = faker.helpers.arrayElement(createdUser).id;
    const randomTeamId = faker.helpers.arrayElement(createdTeams).id;
    const role = faker.helpers.arrayElement(['ADMIN', 'MEMBER']);

    const teamMember = {
      userId: randomUserId,
      teamId: randomTeamId,
      role: role,
    };
    teamMemberRecords.push(teamMember);
  }

  await db.insert(teamMembers).values(teamMemberRecords);
  console.log(`✔️ ${teamMemberRecords.length} team memberships seeded.`);

  console.log('🎉 Database seeding completed successfully!');
};

main();
