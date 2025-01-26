import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, Coffee as CoffeeIcon } from "@mui/icons-material";

interface HeaderProps {
    toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer}
                        
                    
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Vex AI
                </Typography>
                <IconButton color="inherit">
                    <CoffeeIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
