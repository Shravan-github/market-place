import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";
import {
  ShoppingCart,
  Person,
  Logout,
  Settings,
  AccountCircle,
  Home as HomeIcon,
} from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  // Get cart items count from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems?.length || 0;

  // Get user info from Redux store
  const user = useSelector((state) => state.auth?.user);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("profile menu",event.currentTarget)

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo/Brand */}
          <IconButton
            color="inherit"
            onClick={() => navigate("/dashboard")}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Market Place
          </Typography>

          {/* Navigation Items */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Cart Button */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{
                position: "relative",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
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
                  <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircle />
                )
              }
            >
              {user?.name || "Profile"}
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
                minWidth: 220,
                "& .MuiMenuItem-root": {
                  py: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {user && (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 56, height: 56, mx: "auto" }}
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            )}
     
            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 280,
                  "& .MuiMenuItem-root": {
                    py: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {user && (
                <Box sx={{ p: 2 }}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Avatar
                      src={user.avatar}
                      sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
                    />
                    <Typography variant="h6">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "inline-block",
                        px: 1,
                        py: 0.5,
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                        borderRadius: 1,
                        mt: 1,
                      }}
                    >
                      {user.user_type === "seller" ? "Seller" : "Buyer"}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Phone:</strong> {user.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <strong>Location:</strong>{" "}
                      {`${user.address?.city}, ${user.address?.country}`}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Divider />

              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                View Full Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleMenuClose();
                }}
              >
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
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
