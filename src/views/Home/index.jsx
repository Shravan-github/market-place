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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../../api";
import { addToCart } from "../../features/cart/cartSlice";
import { ShoppingCart, Add  } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isSeller = user?.user_type === "seller";

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleCheckout = (itemId) => {
    navigate(`/checkout/${itemId}`);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{ p: 3, color: "error.main" }}>{error}</Box>;
  }

  const handleAddToCart = async (item) => {
    try {
      await dispatch(addToCart({ itemId: item.id, quantity: 1 }));
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Products
        </Typography>

        {isSeller && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddProduct}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Add Product
          </Button>
        )}
      </Box>
      <Grid container spacing={3}>
        {items?.map((item) => (
          <Grid item key={item?.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "relative", paddingTop: "100%" }}>
                <CardMedia
                  component="img"
                  image={item?.image_url}
                  alt={item?.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    mb: 1,
                    height: "2.4em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: "3em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  ${item?.price}
                </Typography>
                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(item)}
                    sx={{
                      textTransform: "none",
                      py: 1,
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handleCheckout(item?.id)}
                    sx={{
                      textTransform: "none",
                      py: 1,
                    }}
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
  );
};

export default Home;
