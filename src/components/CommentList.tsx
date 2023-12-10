import {
  useState,
  useEffect,
  ChangeEvent,
  useContext,
  lazy,
  Suspense,
} from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  List,
} from "@mui/material";
import { database } from "../classes/firebase";
import { DataSnapshot, onValue, off, set, ref } from "firebase/database";
import { UserContext } from "./UserContext";
const Loader = lazy(() => import("./Loader"));
import CommentItem from "./CommentItem";

interface CommentData {
  name: string;
  profile: string;
  timestamp: number;
  stars: number;
  content: string;
  uid: string;
}

const CommentList: React.FC = () => {
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const [submittedComments, setSubmittedComments] = useState<CommentData[]>([]);

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value !== null) {
      setNewRating(value);
    }
  };

  const handleSubmitComment = () => {
    if (!user) return;
    if (newComment && user) {
      const newCommentData: CommentData = {
        name: user.displayName ?? "",
        profile: user.photoURL ?? "",
        timestamp: Date.now(),
        stars: newRating,
        content: newComment,
        uid: user.uid ?? "",
      };

      const newCommentRef = ref(database, `comments/${user.uid}`);
      set(newCommentRef, newCommentData);
    }
  };


  useEffect(() => {
    const commentsRef = ref(database, "comments");

    onValue(commentsRef, (snapshot: DataSnapshot) => {
      const newData: CommentData[] = [];
      snapshot.forEach((childSnapshot) => {
        const { name, profile, timestamp, stars, content, uid }: CommentData =
          childSnapshot.val();
        newData.push({
          name,
          profile,
          timestamp,
          stars,
          content,
          uid,
        });
      });

      setSubmittedComments(newData);
      if (user) {
        const userComment = newData.find((comment) => comment.uid === user.uid);

        if (userComment) {
          setNewRating(userComment.stars);
          setNewComment(userComment.content);
        }
      }
    });

    return () => {
      off(commentsRef);
    };
  }, [user]);

  /*useEffect(() => {
    const userCommentsRef = ref(database, `comments/${user?.uid}`);
    onValue(userCommentsRef, (snapshot: DataSnapshot) => {
      const userComment = snapshot.val();
      if (userComment) {
        setNewRating(userComment.stars);
        setNewComment(userComment.content);
      }
    });
    
    return () => {
      off(userCommentsRef);
    };
  }, [submittedComments]);
  */

  return (
    <Box sx={{ margin: "0 15vw" }}>
      <Suspense fallback={<Loader />}>
        <List>
          {submittedComments.map((comment: CommentData, index: number) => (
            <CommentItem
              key={comment.uid}
              comment={{
                name: comment.name,
                profile: comment.profile,
                timestamp: comment.timestamp,
                stars: comment.stars,
                content: comment.content,
                uid: comment.uid,
                index,
              }}
            />
          ))}
        </List>
      </Suspense>
      {user && (
        <Box sx={{ mt: 4, padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Rate the App
          </Typography>
          <Rating value={newRating} onChange={handleRatingChange} />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter your comment..."
            value={newComment}
            onChange={handleCommentChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSubmitComment}
            sx={{ mt: 2 }}
          >
            Submit Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentList;
