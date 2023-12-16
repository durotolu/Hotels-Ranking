import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/durotolu">
        Modurotolu Olokode
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => (
  <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer" position={"fixed"} bottom={"0"} width={"100%"}>
    <Typography variant="h6" align="center" gutterBottom>
      Footer
    </Typography>
    <Copyright />
  </Box>
);

export default Footer;
