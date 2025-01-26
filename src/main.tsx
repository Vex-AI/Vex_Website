import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router";
import Home from "./screens/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./classes/translation";

const theme = createTheme({});

const Root = () => (
    <ThemeProvider theme={theme}>
        <Browser>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:locale" element={<Home />} />
            </Routes>
        </Browser>
    </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Root />
);