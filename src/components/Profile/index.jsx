// src/components/Profile/index.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Person } from "@mui/icons-material";

const Profile = () => {
  // Get user from auth state
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            <Person sx={{ fontSize: 80 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {user?.username || "User"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user?.email || "No email provided"}
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                User ID
              </Typography>
              <Typography variant="body1">{user?.id || "N/A"}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    User Type
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {user?.user_type || "N/A"}
                  </Typography>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {user?.phone || "Not provided"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1">
                      {user?.address || "Not provided"}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1">Active</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1">
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
