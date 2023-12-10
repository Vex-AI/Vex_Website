import {
  Box,
  Avatar,
  Typography,
  Rating,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
interface CommentData {
  name: string;
  profile: string;
  timestamp: number;
  stars: number;
  content: string;
  uid: string;
  index: number;
}

interface CommentProps {
  comment: CommentData;
}

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Content = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  const { name, profile, timestamp, stars, content } = comment;
  const date: Date = new Date(timestamp);
  const day: string = String(date.getDate());
  const month: string = String(date.getMonth() + 1);
  const year: string = String(date.getFullYear());

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * comment.index }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Container>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={profile} alt={name} />
          </ListItemAvatar>
          <Content>
            <ListItemText
              primary={name}
              secondary={`${day}/${month}/${year}`}
            />
            <Rating value={stars} readOnly />
            <Typography
              sx={{ transition: " heigh 0.3s ease-in-out" }}
              variant="body2"
            >
              {content}
            </Typography>
          </Content>
        </ListItem>
      </Container>
      <Divider />
    </motion.div>
  );
};

export default CommentItem;
