import { useContext, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
import { motion } from "framer-motion";
import { UserContext } from "../components/UserContext";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const loginTheme = useMemo(() => {
    return createTheme({
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
  }, []);
  const { signInGoogle } = useContext(UserContext);

  return (
    <ThemeProvider theme={loginTheme}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
            {t("loginToComment")}
          </Typography>
          <Button
            onClick={signInGoogle}
            fullWidth
            variant="contained"
            color="primary"
          >
            {t("enter")}
          </Button>
        </Paper>
      </motion.div>
    </ThemeProvider>
  );
};

export default memo(Login);
