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

import { RootState } from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddHotel from "./components/AddHotel";
import Categories from "./components/Categories";
import { actions } from "./state/reducers";
import { Chip } from "@mui/material";
import Filter from "./components/Filter";

function App() {
  const { hotels, filterBy } = useSelector(
    ({ app: { hotels, filterBy } }: RootState) => ({
      hotels,
      filterBy,
    })
  );
  const dispatch = useDispatch();

  const openEditHotelModal = ({
    id,
    name,
    country,
    address,
    category,
  }: {
    name: string;
    country: string;
    address: string;
    id: string;
    category: string;
  }) => {
    dispatch(actions.setEditMode(true));
    dispatch(
      actions.setSelectedHotel({ name, country, address, id, category })
    );
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
            justifyContent="space-around"
          >
            <AddHotel />
            <Categories />
            <Filter />
          </Stack>
          <Grid container spacing={4}>
            {hotels.map(({ name, country, address, id, category }, i) => {
              console.log(filterBy);
              if (category !== filterBy && filterBy !== "") return null;
              return (
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
                      <Chip label={country} style={{ maxWidth: "74%" }} />
                      <Button
                        onClick={() =>
                          openEditHotelModal({
                            name,
                            country,
                            address,
                            id,
                            category,
                          })
                        }
                        size="small"
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      <Footer />
    </Container>
  );
}

export default App;
