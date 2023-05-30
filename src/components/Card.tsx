import React from "react";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          borderRadius: "12px",
          backgroundColor: "#294169E0",
          mt: 2,
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{ width: 150, height: 150, borderRadius: "8px", mb: 2 }}
        />
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          {name}
        </Typography>
        <ThemeProvider theme={allTheme}>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={githubUrl}
            target="download button"
            fullWidth
          >
            Visit GitHub
          </Button>
        </ThemeProvider>
      </Paper>
    </motion.div>
  );
};

export default Card;
