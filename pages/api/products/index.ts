import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { title, description, price, quantity, category, manufacturer, imageUrl } = req.body;
    try {
      const newProduct = await prisma.product.create({
        data: {
          title,
          description,
          price,
          quantity,
          category,
          manufacturer,
          imageUrl,
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Метод не разрешен' });
  }
}