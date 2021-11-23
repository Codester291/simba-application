import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'
import CC from 'currency-converter-lt'

export default async function handle(req, res) {
  const { email, amount, fromCurrency, toCurrency } = req.body

  const session = await getSession({ req })
  const loggedInUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  let currencyConverter = new CC({
    from: fromCurrency,
    to: toCurrency,
    amount: parseFloat(amount)
  })
  
  let convertedAmount = await currencyConverter.convert()
  if (loggedInUser.balance < convertedAmount) {
    res.json({
      message: 'Insufficient Balance',
    })

    return;
  }

  const minusBalance = loggedInUser.balance - convertedAmount
  const updatedLoggedInUser = await prisma.user.update({
    where: {
      email: loggedInUser.email
    }, data: {
      balance: Number(minusBalance)
    }
  })

  const userToBeUpdated = await prisma.user.findUnique({
      where: {
          email: email
      }
  })
  
  const newBalance = Number(amount) + userToBeUpdated.balance
  const user = await prisma.user.update({
    where: {
      email: userToBeUpdated.email,
    },
    data: {
      balance: newBalance,
    },
  })
  const result = await prisma.transaction.create({
    data: {
      amount: convertedAmount,
      currency: toCurrency,
      recipient: user.name,
      userId: loggedInUser.id
    },
    include: {
      user: true
    }
  })
  res.json(result)
}
