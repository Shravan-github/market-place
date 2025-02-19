// src/components/Profile/index.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import Header from "../Header";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              src={user?.avatar}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user?.user_type === "seller" ? "Seller" : "Buyer"}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Username:</strong> {user?.username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Phone:</strong> {user?.phone}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              {typeof user?.address === "object" ? (
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>City:</strong> {user?.address?.city}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>State:</strong> {user?.address?.state}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>ZIP Code:</strong> {user?.address?.zipCode}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Country:</strong> {user?.address?.country}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" gutterBottom>
                  {user?.address}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
