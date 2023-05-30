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
    <div>
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
            <Typography variant="body2">{content}</Typography>
          </Content>
        </ListItem>
      </Container>
      <Divider />
    </div>
  );
};

export default CommentItem;
