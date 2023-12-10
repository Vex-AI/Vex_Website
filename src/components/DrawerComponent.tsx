import { useContext } from "react";
import { Drawer, Avatar, Typography, Button, Box } from "@mui/material";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { UserContext } from "../components/UserContext";
import { styled } from "@mui/system";

const DrawerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: "100%",
  borderRight: "1px solid white",
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  borderRadius: "9px",
});

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
}
const DrawerComponent: React.FC<DrawerComponentProps> = ({ open, onClose }) => {
  const { user, logOutGoogle } = useContext(UserContext);

  return (
    <Drawer onClose={onClose} anchor="left" open={open}>
      <DrawerContent>
        <AvatarContainer>
          <StyledAvatar
            src={
              user
                ? user.photoURL ??
                  "https://github.com/Vex-AI/VexAI/raw/main/public/Vex_320.png"
                : ""
            }
            alt={user ? user.displayName || "Guest" : ""}
          />
        </AvatarContainer>
        <Typography variant="h6" sx={{ marginBottom: "12px" }}>
          {user ? user.displayName : "Guest user"}
        </Typography>

        {user && (
          <Button
            onClick={logOutGoogle}
            startIcon={<ExitToAppIcon />}
            sx={{
              color: (theme) => theme.palette.text.primary,
              bgcolor: (theme) => theme.palette.primary.main,
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.dark,
              },
              mt: 2,
            }}
          >
            Logout
          </Button>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
