import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Header = () => (
  <Container>
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Hotel Ranking
        </Typography>
      </Toolbar>
    </AppBar>
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 4,
        pb: 0,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Hotel Ranking
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Manage hotels ranking and categories.
        </Typography>
      </Container>
    </Box>
  </Container>
)

export default Header;
