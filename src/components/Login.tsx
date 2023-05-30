import { useContext } from "react";
import {
  Button,
  Paper,
  Typography,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { green } from "@mui/material/colors";

import { UserContext } from "../components/UserContext";

const loginTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[200],
    },
    secondary: {
      main: "#000",
    },
  },
});

const Login: React.FC = () => {
  const { signInGoogle } = useContext(UserContext);

  return (
    <ThemeProvider theme={loginTheme}>
      <CssBaseline />
      <Paper
        sx={{
          border: "solid white 1px",
          padding: "2rem",
          display: "flex",
          borderSizing: "border-box",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem 1rem",
          paddingBottom: "2rem",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: loginTheme.palette.primary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Log in to comment
        </Typography>
        <Button
          onClick={signInGoogle}
          fullWidth
          variant="contained"
          color="primary"
        >
          SignIn
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default Login;
