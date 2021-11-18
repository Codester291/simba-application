// pages/api/publish/[id].ts
import prisma from '../../lib/prisma';
import NextCors from 'nextjs-cors';

// PUT /api/publish/:id
export default async function handle(req, res) {

  const {name, email, password} = req.body
  await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const response = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password
    }
  });
  res.json(response);
}