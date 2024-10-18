// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const addItem = (item) => {
    axios.post('http://localhost:5000/api/items', item)
      .then(response => {
        setItems([...items, response.data]);
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:5000/api/items/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
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
