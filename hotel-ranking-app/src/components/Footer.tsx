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
  <Box
    sx={{ bgcolor: "background.paper", p: 2 }}
    component="footer"
    position={"fixed"}
    bottom={"0"}
    left={"50%"}
    style={{ transform: "translate(-50%, 0)" }}
  >
    <Copyright />
  </Box>
);

export default Footer;
