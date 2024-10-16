// src/App.js
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const addItem = (item) => {
    setItems([...items, { id: items.length + 1, ...item }]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        CRUD Application
      </Typography>
      <ItemForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} setCurrentItem={setCurrentItem} />
      <ItemList items={items} deleteItem={deleteItem} editItem={editItem} />
    </Container>
  );
}

export default App;
