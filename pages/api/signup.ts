// pages/api/publish/[id].ts
import prisma from '../../lib/prisma'
import { hashSync } from 'bcrypt'

export default async function handle(req, res) {
  const { name, email, password } = req.body

  const findUser = await prisma.user.findFirst({
    where: { email: email },
  })

  if(findUser) {
    throw new Error("User already exists")
  }

  const response = await prisma.user.create({
    data: {
      name: name,
      email: email,
      balance: 10000.0,
      password: await hashSync(password, 10),
    },
  })

  res.status(200).send({ message: 'User created', user: response })
  return
}
