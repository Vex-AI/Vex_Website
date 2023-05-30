import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,

} from "@mui/material";
import { Menu as MenuIcon, Coffee as CoffeeIcon } from "@mui/icons-material";
import {useState} from "react"
import DrawerComponent from "./DrawerComponent";

const Header = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const toggleDrawer = () => {
    setDrawer((prev: boolean) => !prev);
  };

  return (
    <AppBar position="sticky">
      <DrawerComponent onClose={toggleDrawer} open={drawer} />
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
