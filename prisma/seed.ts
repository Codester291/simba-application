import { PrismaClient, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'omotolani',
    email: 'xyz@prisma.io',
    password: hashSync('stuff', 10).toString(),
    balance: 1500.00,
    transactions: {
      create: [
        {
          amount: 234.23,
          currency: 'EUR',
          recipient: "Mauricio Pochettino"
        },
      ],
    },
  },
  {
    name: 'Simba',
    email: 'lion@king.io',
    password: hashSync('stuffs', 10).toString(),
    balance: 1500.00,
    transactions: {
      create: [
        {
          amount: 159.12,
          currency: 'USD',
          recipient: 'Alan Smith'
        },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })