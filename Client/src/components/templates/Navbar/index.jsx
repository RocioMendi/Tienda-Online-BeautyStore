import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartContext } from '../../store/cartContext'; // Importar el contexto del carrito

const pages = ['Productos', 'Sobre Nosotros', 'Contacto'];
const settings = [
  { name: 'Ingresá', path: '/login' },
  { name: 'Registrate', path: '/register' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { cartItems } = useContext(CartContext); // Acceder al estado del carrito
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Total de ítems en el carrito

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFB6C1' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 200, height: 80, marginRight: 16 }}
          />

          {/* Menú móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link
                      to={`/${page.toLowerCase().replace(' ', '-')}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menú principal para pantallas grandes */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link
                  to={`/${page.toLowerCase().replace(' ', '-')}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Sección derecha: carrito y usuario */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* Botón del carrito */}
            <IconButton color="black" sx={{ mr: 2 }}>
              <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>
                <ShoppingCartIcon />
                <span style={{ fontSize: '0.8rem', marginLeft: 4 }}>
                  {cartCount}
                </span>
              </Link>
            </IconButton>

            {/* Menú de usuario */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link
                      to={setting.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {setting.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
