'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledTable = styled(TableContainer)`
  width: 100%;
  overflow-x: auto;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]); // массив товаров
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', quantity: '' }); // состояние нового продукта

  // Загружаем список товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/list');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Отправляем новый продукт на сервер
  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setNewProduct({ title: '', description: '', price: '', quantity: '' });
      } else {
        console.error('Ошибка при добавлении продукта:', await response.text());
      }
    } catch (err) {
      console.error('Ошибка при добавлении продукта:', err);
    }
  };

  return (
    <div>
      {/* Таблица товаров */}
      <StyledTable component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">{row.price.toFixed(2)} ₽</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTable>

      {/* Форма добавления нового продукта */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <TextField
          label="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <TextField
          label="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <TextField
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <TextField
          label="Quantity"
          type="number"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductList;