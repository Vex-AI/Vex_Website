import { useCallback } from "react";
import { Paper, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";

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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: "#294169E0",
                    padding: 2,
                    cursor: "pointer", 
                    boxShadow: 1, 
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                        transform: "scale(1.05)", // Efeito de zoom ao passar o mouse
                        boxShadow: 4 // Efeito de foco com sombra mais intensa
                    }
                }}
                onClick={() => openUrl(githubUrl)}
            >
                <Avatar
                    alt={name}
                    src={avatarUrl}
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%", // Avatar totalmente redondo
                        marginBottom: 1
                    }}
                />
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        color: "text.primary", // Usando o texto da paleta principal
                        fontWeight: 500,
                        wordBreak: "break-word",
                        textAlign: "center"
                    }}
                >
                    {name}
                </Typography>
            </Paper>
        </motion.div>
    );
};

export default Card;
