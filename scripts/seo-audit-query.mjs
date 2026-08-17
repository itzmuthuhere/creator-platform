import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const statusCounts = await prisma.post.groupBy({ by: ['status'], _count: true });
const localeCounts = await prisma.post.groupBy({ by: ['locale', 'status'], _count: true });
const totalPosts = await prisma.post.count();
const categoriesAll = await prisma.category.findMany({
  select: { slug: true, name: true, _count: { select: { posts: { where: { status: 'PUBLISHED' } } } } },
});
const noCanonicalCustom = await prisma.post.count({ where: { status: 'PUBLISHED', canonicalUrl: { not: null } } });
const missingSeoTitle = await prisma.post.count({ where: { status: 'PUBLISHED', seoTitle: null } });
const missingMetaDesc = await prisma.post.count({ where: { status: 'PUBLISHED', metaDescription: null } });
const missingOgImage = await prisma.post.count({ where: { status: 'PUBLISHED', ogImage: null, coverImage: null } });
const duplicateSlugsCheck = await prisma.$queryRawUnsafe(`SELECT slug, COUNT(*) c FROM "Post" GROUP BY slug HAVING COUNT(*) > 1`);
const publishedNullPublishedAt = await prisma.post.count({ where: { status: 'PUBLISHED', publishedAt: null } });

console.log(JSON.stringify({
  totalPosts,
  statusCounts,
  localeCounts,
  categoriesAll,
  noCanonicalCustom,
  missingSeoTitle,
  missingMetaDesc,
  missingOgImage,
  duplicateSlugsCheck,
  publishedNullPublishedAt,
}, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2));

await prisma.$disconnect();
