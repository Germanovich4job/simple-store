
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Получение всех продуктов
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение продукта по ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового продукта
export const createProduct = async (req, res) => {
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
};

// Обновление продукта
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, quantity, category, manufacturer, imageUrl } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
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
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление продукта
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};