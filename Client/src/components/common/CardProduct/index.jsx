import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CardProduct({ product }) {  // Recibe el producto como prop
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        sx={{ height: 250 }}
        image={product.image}  // Utiliza la imagen del producto
        title={product.title}  // Título del producto
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}  {/* Título del producto */}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}  {/* Descripción del producto */}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button 
            size="small" 
            sx={{ 
              backgroundColor: '#FFB6C1',   
              color: 'black',
              mx: 1, 
              '&:hover': {
                backgroundColor: '#fff',
                color: 'black',
                border: '2px solid #FF69B4'
              }
            }}
          >
            Comprar
          </Button>
          <Button 
            size="small" 
            sx={{ 
              backgroundColor: '#FFB6C1',
              color: 'black',
              mx: 1,
              '&:hover': {
                backgroundColor: '#fff',
                color: 'black',
                border: '2px solid #FF69B4'
              }
            }}
          >
            Agregar al carrito
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
