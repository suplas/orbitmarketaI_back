import { PrismaClient, Role, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.promotionEvent.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();


  const saltRounds = 10;
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 1. Create Users (Seller and Promoter)
  const seller = await prisma.user.create({
    data: {
      email: 'seller@example.com',
      password: hashedPassword,
      name: 'Orbit Seller',
      role: Role.seller,
      platform: 'local',
    },
  });

  const promoter = await prisma.user.create({
    data: {
      email: 'promoter@example.com',
      password: hashedPassword,
      name: 'Orbit Promoter',
      role: Role.promoter,
      platform: 'local',
    },
  });

  console.log({ seller, promoter });

  // 2. Create Products by Seller
  const product1 = await prisma.product.create({
    data: {
      name: 'AI-Powered Smart Tumbler',
      description: 'This tumbler tracks your hydration level using AI.',
      category: 'Gadgets',
      price: 99000,
      reward: 10000,
      rewardRate: 10,
      imageUrl: 'https://example.com/images/smart_tumbler.jpg',
      sellerId: seller.id,
      status: ProductStatus.active,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Organic Space Coffee Beans',
      description: 'Coffee beans grown in a zero-gravity environment.',
      category: 'Food',
      price: 25000,
      reward: 2500,
      rewardRate: 10,
      imageUrl: 'https://example.com/images/space_coffee.jpg',
      sellerId: seller.id,
      status: ProductStatus.active,
    },
  });

  console.log({ product1, product2 });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 