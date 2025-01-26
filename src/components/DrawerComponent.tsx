import { Drawer, Typography, Button, Avatar } from "@mui/material";
import {
    ExitToApp as ExitToAppIcon,
    Person as PersonIcon
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";

const DrawerComponent: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose
}) => {
    const user = useUserStore((state) => state.user);
    const logOutGoogle = useUserStore((state) => state.logOutGoogle);

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
                style={{ width: 250, padding: 20 }}
            >
                {/* Imagem e Nome */}
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <Avatar
                        src={
                            user && user.photoURL
                                ? user.photoURL
                                : "https://via.placeholder.com/150"
                        }
                        alt="User Avatar"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 0
                        }}
                    />
                    <Typography variant="h6" style={{ marginTop: 10 }}>
                        {user ? user.displayName : "Guest User"}
                    </Typography>
                </div>

                {/* Botões */}
                <div>
                    {user ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ExitToAppIcon />}
                            fullWidth
                            onClick={logOutGoogle}
                        >
                            Log Off
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PersonIcon />}
                            fullWidth
                        >
                            Log In
                        </Button>
                    )}
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerComponent;