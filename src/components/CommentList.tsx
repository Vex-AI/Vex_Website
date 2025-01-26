import { useState, useEffect, ChangeEvent } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    List
} from "@mui/material";
import { database } from "../classes/firebase";
import { DataSnapshot, onValue, off, set, ref } from "firebase/database";
import { useUserStore } from "../store/userStore";
import { useTranslation } from "react-i18next";
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
    const { user } = useUserStore();
    const { t } = useTranslation();
    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number>(0);
    const [submittedComments, setSubmittedComments] = useState<CommentData[]>(
        []
    );

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleRatingChange = (
        _: React.SyntheticEvent<Element, Event>,
        value: number | null
    ) => {
        if (value !== null) setNewRating(value);
    };

    const handleSubmitComment = () => {
        if (!user) return;

        const newCommentData: CommentData = {
            name: user.displayName ?? "",
            profile: user.photoURL ?? "",
            timestamp: Date.now(),
            stars: newRating,
            content: newComment,
            uid: user.uid ?? ""
        };

        const newCommentRef = ref(database, `comments/${user.uid}`);
        set(newCommentRef, newCommentData)
            .then(() => {
                setNewComment("");
                setNewRating(0);
            })
            .catch(error => {
                console.error("Error submitting comment: ", error);
            });
    };

    useEffect(() => {
        const commentsRef = ref(database, "comments");

        const commentsListener = (snapshot: DataSnapshot) => {
            const newData: CommentData[] = [];
            snapshot.forEach(childSnapshot => {
                const {
                    name,
                    profile,
                    timestamp,
                    stars,
                    content,
                    uid
                }: CommentData = childSnapshot.val();
                newData.push({ name, profile, timestamp, stars, content, uid });
            });

            setSubmittedComments(newData);

            if (user) {
                const userComment = newData.find(
                    comment => comment.uid === user.uid
                );
                if (userComment) {
                    setNewRating(userComment.stars);
                    setNewComment(userComment.content);
                }
            }
        };

        onValue(commentsRef, commentsListener);

        return () => {
            off(commentsRef);
        };
    }, [user]);

    return (
        <Box>
            <List sx={{ padding: "0 30px" }}>
                {submittedComments.map((comment, i) => (
                    <CommentItem
                        key={comment.uid}
                        index={i}
                        comment={comment}
                    />
                ))}
            </List>

            {user && (
                <Box sx={{ mt: 4, padding: "1rem" }}>
                    <Typography variant="h6" gutterBottom>
                        {t("rateApp")}
                    </Typography>
                    <Rating value={newRating} onChange={handleRatingChange} />
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder={t("enterComment")}
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
                        {t("submitComment")}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CommentList;
