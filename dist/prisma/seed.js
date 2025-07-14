"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding ...');
    await prisma.promotionEvent.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    const saltRounds = 10;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const seller = await prisma.user.create({
        data: {
            email: 'seller@example.com',
            password: hashedPassword,
            name: 'Orbit Seller',
            role: client_1.Role.seller,
            platform: 'local',
        },
    });
    const promoter = await prisma.user.create({
        data: {
            email: 'promoter@example.com',
            password: hashedPassword,
            name: 'Orbit Promoter',
            role: client_1.Role.promoter,
            platform: 'local',
        },
    });
    console.log({ seller, promoter });
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
            status: client_1.ProductStatus.active,
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
            status: client_1.ProductStatus.active,
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
//# sourceMappingURL=seed.js.map