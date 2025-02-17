// src/pages/Home.jsx
// Modified Home component with Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../../api";
import { addToCart } from "../../features/cart/cartSlice";
import { ShoppingCart } from "@mui/icons-material";
import Header from "../../components/Header";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const navigate = useNavigate();

  const handleCheckout = (itemId) => {
    navigate(`/checkout/${itemId}`);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  if (status == "loading") {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{ p: 3, color: "error.main" }}>{error}</Box>;
  }

  const handleAddToCart = async (item) => {
    try {
      await dispatch(addToCart({ itemId: item.id, quantity: 1 }));
      // You can add a success notification here
    } catch (error) {
      // Handle error
    }
  };
// src/layouts/MainLayout.jsx
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={4}>
          {items?.map((item) => (
            <Grid item key={item?.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item?.image_url}
                  alt={item?.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${item?.price}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleCheckout(item?.id)}
                    >
                      Checkout
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
