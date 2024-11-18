import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal,
} from '@mui/material';

const drawerWidth = 240;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFB6C1',
  boxShadow: 24,
  p: 4,
};

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', precio: '', imagen: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (product = null) => {
    setEditMode(!!product);
    if (product) {
      setFormData(product);
      setCurrentProductId(product.id);
    } else {
      setFormData({ nombre: '', precio: '', imagen: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ nombre: '', precio: '', imagen: '' });
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/productos/${currentProductId}`, formData);
      } else {
        await axios.post('http://localhost:5000/productos', formData);
      }
      fetchProductos();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`);

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/productos/${id}`);
        fetchProductos(); // Volver a cargar los productos después de eliminar
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#FFB6C1' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
            Panel de Administración
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          bgcolor: '#FFB6C1',
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#FFB6C1' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleOpenModal()}>
              <ListItemText primary="Agregar Producto" sx={{ color: 'black' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fdeaf2', p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          Lista de Productos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'black' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'black' }}>Precio</TableCell>
                <TableCell sx={{ color: 'black' }}>Imagen</TableCell>
                <TableCell sx={{ color: 'black' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell sx={{ color: 'black' }}>{producto.nombre}</TableCell>
                  <TableCell sx={{ color: 'black' }}>${producto.precio}</TableCell>
                  <TableCell>
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>
                    <Button sx={{ bgcolor: '#FFB6C1', color: 'black' }} onClick={() => handleOpenModal(producto)}>Editar</Button>
                    <Button color="error" onClick={() => handleDelete(producto.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            {editMode ? 'Editar Producto' : 'Agregar Producto'}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            sx={{ input: { color: 'black' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Precio"
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleInputChange}
            sx={{ input: { color: 'black' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Imagen (URL)"
            name="imagen"
            value={formData.imagen}
            onChange={handleInputChange}
            sx={{ input: { color: 'black' } }}
          />
          <Button variant="contained" sx={{ bgcolor: '#FFB6C1', color: 'black' }} onClick={handleSubmit}>
            {editMode ? 'Actualizar' : 'Agregar'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
