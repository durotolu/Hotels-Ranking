import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import "./App.css";
import { RootState } from "./store";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AddHotel from "./components/AddHotel";
import Categories from "./components/Categories";
import { actions } from "./state/reducers";

function App() {
  const { hotels } = useSelector(({ app: { hotels } }: RootState) => ({
    hotels,
  }));
  const dispatch = useDispatch();

  const openEditHotelModal = ({
    id,
    name,
    country,
    address,
  }: {
    name: string;
    country: string;
    address: string;
    id: string;
  }) => {
    dispatch(actions.setEditMode(true));
    dispatch(actions.setSelectedHotel({ name, country, address, id }));
    dispatch(actions.toggleHotelModal());
  };

  return (
    <Container>
      <Header />
      <main>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Stack
            sx={{ pb: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <AddHotel />
            <Categories />
          </Stack>
          <Grid container spacing={4}>
            {hotels.map(({ name, country, address, id }, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    <Typography>{address}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button size="small">{country}</Button>
                    <Button
                      onClick={() =>
                        openEditHotelModal({ name, country, address, id })
                      }
                      size="small"
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </Container>
  );
}

export default App;
