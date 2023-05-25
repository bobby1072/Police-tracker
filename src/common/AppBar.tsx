import { useState } from "react";
import {
  Box,
  Divider,
  List,
  Drawer,
  IconButton,
  Toolbar,
  styled,
  useTheme,
  AppBar,
  ListItem,
  Typography,
} from "@mui/material";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export const MainAppBar: React.FC = () => {
  const [open, setOpenMenu] = useState<boolean>(false);
  const theme = useTheme();
  const openDraw = () => {
    setOpenMenu(true);
  };
  const closeDraw = () => {
    setOpenMenu(false);
  };
  return (
    <div>
      <Box
        sx={{
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.9)",
        }}
      >
        <AppBar position="static" sx={{ padding: 2.4 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDraw}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Typography fontSize={50} variant="subtitle2">
              Police-Tracker
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={closeDraw}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            key="cpu"
            disablePadding
            onClick={() => {
              window.location.href = "/force";
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ModeStandbyIcon />
              </ListItemIcon>
              <ListItemText primary="Force" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
