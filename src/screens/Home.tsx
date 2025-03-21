import { useState, useEffect, useMemo, Suspense } from "react";
import { useParams } from "react-router";
import {
    Box,
    Grid,
    Typography,
    Button,
    ThemeProvider,
    createTheme,
    CssBaseline
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Header from "../components/Header";
import DrawerComponent from "../components/DrawerComponent";
import CommentList from "../components/CommentList";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "../classes/translation";
import { useDeveloperStore } from "../store/developerStore";
import { useUserStore } from "../store/userStore";
import { GooglePlayButton } from "react-mobile-app-button";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

interface IDev {
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
    const [drawer, setDrawer] = useState<boolean>(false);
    const [appVersion, setAppVersion] = useState<string>("...");
    const [artifactAPKLink, setArtifactAPKLink] = useState("");
    const [artifactAABLink, setArtifactAABLink] = useState("");
    const { t } = useTranslation();
    const { locale } = useParams<{ locale: string }>();

    const user = useUserStore(state => state.user);
    const developers = useDeveloperStore(state => state.developers);
    const lastFetch = useDeveloperStore(state => state.lastFetch);
    const setDevelopers = useDeveloperStore(state => state.setDevelopers);
    const setLastFetch = useDeveloperStore(state => state.setLastFetch);

    const toggleDrawer = () => setDrawer(prev => !prev);

    useEffect(() => {
        i18n.changeLanguage(locale);
        //@ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [locale]);

    const fetchDevelopers = async () => {
        try {
            const response = await fetch(
                "https://api.github.com/repos/vex-ai/vexai/contributors"
            );
            const data: IDev[] = await response.json();
            setDevelopers(data);
            setLastFetch(Date.now());
        } catch (error) {
            console.error("Error fetching developers:", error);
        }
    };

    // Verifica se os dados estão no cache e se o cache é válido
    useEffect(() => {
        const ONE_DAY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

        // Se os dados estão no cache e o cache é válido
        if (developers.length === 0 || Date.now() - lastFetch > ONE_DAY) {
            fetchDevelopers(); // Se não tiver cache ou o cache for mais antigo que 24h, buscar novamente
        }
    }, [developers, lastFetch, setDevelopers, setLastFetch]);

    // Renderiza os desenvolvedores ou o Loader
    const renderDevelopers = useMemo(() => {
        return developers.length > 0 ? (
            developers.map(developer => (
                <Card
                    key={developer.id}
                    name={developer.login}
                    avatarUrl={developer.avatar_url}
                    githubUrl={developer.html_url}
                />
            ))
        ) : (
            <Loader />
        );
    }, [developers]);

    useEffect(() => {
        const fetchReleaseData = async () => {
            try {
                const releaseResponse = await axios.get(
                    "https://api.github.com/repos/Vex-AI/VexAI/releases/latest"
                );
                const assetsResponse = await axios.get(
                    releaseResponse.data.assets_url
                );
                const artifactAPK = assetsResponse.data.find((asset: any) =>
                    asset.name.endsWith(".apk")
                );
                const artifactAAB = assetsResponse.data.find((asset: any) =>
                    asset.name.endsWith(".aab")
                );
                if (artifactAPK) {
                    setArtifactAPKLink(artifactAPK.browser_download_url);
                    setAppVersion(releaseResponse.data.tag_name);
                }
                if (artifactAAB) {
                    setArtifactAABLink(artifactAAB.browser_download_url);
                }
            } catch (error) {
                console.error("Error fetching release data:", error);
            }
        };
        fetchReleaseData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DrawerComponent onClose={toggleDrawer} open={drawer} />
            <Header toggleDrawer={toggleDrawer} />
            <Box
                sx={{
                    backgroundColor: "#212121",
                    py: 8,
                    px: 4,
                    paddingBottom: "3rem"
                }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography
                                variant="h4"
                                align="center"
                                gutterBottom
                            >
                                <img
                                    src="https://github.com/Vex-AI/VexAI/raw/main/public/Vex_320.png"
                                    alt="VexAI"
                                    style={{
                                        width: "120px",
                                        borderRadius: "8px"
                                    }}
                                />
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography
                                variant="h4"
                                align="center"
                                gutterBottom
                            >
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >
                            <Button
                                onClick={() =>
                                    window.open(
                                        "https://vexai.netlify.app/",
                                        "_blank"
                                    )
                                }
                                variant="outlined"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                fullWidth
                                sx={{ borderRadius: 50 }}
                            >
                                {t("visitOnlineVersion")}
                            </Button>
                            <Button
                                onClick={() =>
                                    window.open(artifactAPKLink, "_blank")
                                }
                                variant="outlined"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                fullWidth
                                sx={{ borderRadius: 50 }}
                            >
                                {t("downloadApp")} APK({appVersion})
                            </Button>
                            <Button
                                onClick={() =>
                                    window.open(artifactAABLink, "_blank")
                                }
                                variant="outlined"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                fullWidth
                                sx={{ borderRadius: 50 }}
                            >
                                {t("downloadApp")} AAB({appVersion})
                            </Button>
                            <GooglePlayButton
        url={"https://play.google.com/store/apps/details?id=com.cookieukw.vex"}
        theme={"dark"}


        className={"custom-style"}
      
      />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{ mt: 2 }}
                        >
                            {t("developersContributors")}
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(60px, 1fr))",
                                gap: "1rem",
                                marginTop: "1rem",
                                placeItems: "center"
                            }}
                        >
                            {renderDevelopers}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 4, padding: "3rem 0" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {t("comments")}
                </Typography>
                <CommentList />
            </Box>
            <Box>
                {!user && (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                )}
            </Box>

            <Footer />
        </ThemeProvider>
    );
};

export default Home;
