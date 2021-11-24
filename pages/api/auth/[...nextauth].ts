import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from '../../../lib/prisma'
import { compare } from 'bcrypt'

const options = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      id: 'credentials',
      name: 'Login',
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) {
          throw new Error('User with email not found')
        }
        const checkPassword = await compare(credentials.password, user.password)

        if (!checkPassword) {
          throw new Error('Invalid password')
        }
        return user
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
      if (token) {
        session.id = token.id
      }

      return session
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }

      return token
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
