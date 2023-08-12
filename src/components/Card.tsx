import { useCallback } from "react";
import { Paper, Typography, Button, Avatar } from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const allTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
});

interface CardProps {
  name: string;
  avatarUrl: string;
  githubUrl: string;
}
const Card: React.FC<CardProps> = ({ name, avatarUrl, githubUrl }) => {
  const openUrl = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <motion.div
      style={{ width: "fit-content" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px 4px",
          justifyContent: "center",
          borderRadius: "8px",
          backgroundColor: "#294169E0",
          alignContent: "center",
          width: "100%",
          height: "fit-content",
        }}
        onClick={() => {
          openUrl(githubUrl);
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 20,
            height: 20,
            borderRadius: "3px",
          }}
        />
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            color: "#fff",
            fontSize: "3px",
            width: "40px",
            wordBreak: "break-all",
          }}
        >
          {name}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default Card;
