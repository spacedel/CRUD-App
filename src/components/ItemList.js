// src/components/ItemList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemList = ({ items, deleteItem, editItem }) => {
  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', mt: 4 }}>
      <h2>Item List</h2>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => editItem(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemList;
