import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Logout,
  Settings,
  AccountCircle,
  Home as HomeIcon,
} from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  // Get cart items count from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems?.length || 0;

  // Get user info from Redux store (adjust according to your auth state structure)
  const user = useSelector((state) => state.auth?.user);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch your logout action here
    // dispatch(logout());
    navigate('/signin');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo/Brand */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            Market Place
          </Typography>

          {/* Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Cart Button */}
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{
                position: 'relative',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Profile Button */}
            <Button
              color="inherit"
              onClick={handleProfileMenuOpen}
              startIcon={
                user?.avatar ? (
                  <Avatar
                    src={user.avatar}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircle />
                )
              }
            >
              {user?.name || 'Profile'}
            </Button>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                '& .MuiMenuItem-root': {
                  py: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {
              navigate('/profile');
              handleMenuClose();
            }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem onClick={() => {
              navigate('/settings');
              handleMenuClose();
            }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
