import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
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
const Login = lazy(() => import("../components/Login"));
import { Download as DownloadIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import i18n from "../classes/translation";
const Home: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [developers, setDevelopers] = useState<Dev[]>([]);

  const openUrl = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  useEffect(() => {
    i18n.changeLanguage(locale);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/repos/vex-ai/vexai/contributors")
      .then((response) => response.json())
      .then((data: Dev[]) => setDevelopers(data))
      .catch((error) => console.log(error));
  }, []);

  const renderDevelopers = useMemo(() => {
    if (developers.length > 0) {
      return developers.map((developer) => (
        <Card
          key={developer.id}
          name={developer.login}
          avatarUrl={developer.avatar_url}
          githubUrl={developer.html_url}
        />
      ));
    } else {
      return <Loader />;
    }
  }, [developers]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          backgroundColor: "#212121",
          py: 8,
          px: 4,
          paddingBottom: "3rem",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                <img
                  src="https://github.com/Vex-AI/VexAI/raw/main/public/Vex_320.png"
                  alt="VexAI"
                  style={{ width: "120px", borderRadius: "8px" }}
                />
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                {t("aboutProject")}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography
                variant="body1"
                align="center"
                textAlign="justify"
                gutterBottom
              >
                {t("description")}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
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
                {t("visitOnlineVersion")}
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
                {t("downloadApp")}
              </Button>
            </motion.div>
          </Grid>

          <Grid sx={{ margin: "0 2rem" }} item xs={12} sm={6} md={4}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ mt: 2, marginTop: "2rem" }}
            >
              {t("developersContributors")}
            </Typography>
            <List
              sx={{
                display: "grid",
               gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              {renderDevelopers}
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, padding: "3rem 0" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t("comments")}
        </Typography>
        <Suspense fallback={<Loader />}>
          <CommentList />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      </Box>

      <ins
        className="adsbygoogle"
        style={{ backgroundColor: "red" }}
        data-ad-client="ca-pub-3239733554197124"
        data-ad-slot="3045264184"
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true"
      ></ins>
      <Footer />
    </ThemeProvider>
  );
};

export default Home;
