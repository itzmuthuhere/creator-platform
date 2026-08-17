import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'node:fs';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
    subtitle: true,
    content: true,
    excerpt: true,
    status: true,
    publishedAt: true,
    scheduledAt: true,
    keywords: true,
  },
});

fs.mkdirSync('data/article-content', { recursive: true });
fs.writeFileSync('data/article-content/all-posts.json', JSON.stringify(posts, null, 2));
console.log(`Dumped ${posts.length} posts.`);

await prisma.$disconnect();
