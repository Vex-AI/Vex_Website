import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  List,
} from "@mui/material";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Card from "../components/Card";
import CommentList from "../components/CommentList";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Login from "../components/Login";

import { Download as DownloadIcon } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface Dev {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

const Home: React.FC = () => {
  const [developers, setDevelopers] = useState<Dev[]>([]);

  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetch("https://api.github.com/repos/vex-ai/vexai/contributors")
      .then((response) => response.json())
      .then((data: Dev[]) => setDevelopers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ backgroundColor: "#212121", py: 8, px: 4, paddingBottom: "3rem" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
                <img
                  src="https://github.com/Vex-AI/VexAI/raw/main/public/Vex_320.png"
                  alt="VexAI"
                  style={{ width: "120px", borderRadius: "8px" }}
                />
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
                ABOUT PROJECT
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Typography
                variant="body1"
                align="center"
                textAlign="justify"
                gutterBottom
                sx={{ color: "#fff" }}
              >
                This is an AI I've been building since 2019. It was an Android
                app made in Java. I had a lot of problems implementing features,
                mainly machine learning and problems with the play store (it
                took time to grow, politics and such). So one day I decided to
                create a version with React and NodeJS (so it's still under
                construction), with the aim of creating an AI capable of having
                a normal conversation with a person and talking about games and
                various subjects... and who knows... becoming a conscious AI
                (⊙_⊙)
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Button
                onClick={() => {
                  openUrl("https://vexai.netlify.app/");
                }}
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                fullWidth
                sx={{ my: 2 }}
              >
                Visit online version
              </Button>
              <Button
                onClick={() => {
                  openUrl("https://github.com/Vex-AI/VexAI_Java/releases");
                }}
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                fullWidth
                sx={{ my: 2 }}
              >
                DOWNLOAD APP
              </Button>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "#fff", mt: 2, marginTop: "2rem" }}
            >
              Developers & Contributors
            </Typography>
            <List
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              {developers.length > 0 ? (
                developers.map((developer) => (
                  <Card
                    key={developer.id}
                    name={developer.login}
                    avatarUrl={developer.avatar_url}
                    githubUrl={developer.html_url}
                  />
                ))
              ) : (
                <Loader />
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, padding: "3rem 0" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Comments
        </Typography>
        <CommentList />
        <Login />
      </Box>
      <Footer/>
    </ThemeProvider>
  );
};

export default Home;
