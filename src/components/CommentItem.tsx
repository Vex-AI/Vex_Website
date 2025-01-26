import {
    Box,
    Avatar,
    Typography,
    Rating,
    ListItem,
    Divider,
    Stack
} from "@mui/material";
import { motion } from "framer-motion";

interface CommentData {
    name: string;
    profile: string;
    timestamp: number;
    stars: number;
    content: string;
    uid: string;
}

interface CommentProps {
    comment: CommentData;
    index: number;
}

const CommentItem: React.FC<CommentProps> = ({ comment, index }) => {
    const { name, profile, timestamp, stars, content } = comment;
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
            exit={{ opacity: 0, y: -10 }}
        >
            <ListItem
                alignItems="flex-start"
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={profile} alt={name} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {name}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                    <Rating value={stars} readOnly />
                    <Typography variant="body2" color="textSecondary">
                        {`${day}/${month}/${year}`}
                    </Typography>
                </Stack>

                <Box mt={2}>
                    <Typography variant="body2" color="textPrimary">
                        {content}
                    </Typography>
                </Box>
            </ListItem>
            <Divider sx={{ marginTop: 2 }} />
        </motion.div>
    );
};

export default CommentItem;
