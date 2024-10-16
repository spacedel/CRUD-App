// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ItemForm = ({ addItem, updateItem, currentItem, setCurrentItem }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
    } else {
      setName('');
    }
  }, [currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      updateItem({ id: currentItem.id, name });
    } else {
      addItem({ name });
    }
    setName('');
    setCurrentItem(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <TextField
        label="Item Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        {currentItem ? 'Update' : 'Add'} Item
      </Button>
    </Box>
  );
};

export default ItemForm;
