import bcrypt from 'bcrypt';
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });



async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Admin
  const adminPassword = await bcrypt.hash('admin1234', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Amina Admin',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created/verified');

  // 2. Create Agent
  const agentPassword = await bcrypt.hash('agent1234', 10);
  const agent = await prisma.user.upsert({
    where: { email: 'agent@test.com' },
    update: {},
    create: {
      email: 'agent@test.com',
      name: 'Daniel Agent',
      password: agentPassword,
      role: 'agent',
    },
  });
  console.log('✅ Agent user created/verified');

  // 3. Create a Sample Field (optional but helpful)
  await prisma.field.upsert({
    where: {
      name_cropType_plantingDate_currentStage: {
        name: 'North Cornfield',
        cropType: 'Maize',
        plantingDate: new Date('2024-03-01'),
        currentStage: 'growing',
      }
    },
    update: {},
    create: {
      name: 'North Cornfield',
      cropType: 'Maize',
      plantingDate: new Date('2024-03-01'),
      currentStage: 'growing',
      assignedAgentId: agent.id,
    },
  });
  console.log('✅ Sample field created');

  console.log('🚀 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
