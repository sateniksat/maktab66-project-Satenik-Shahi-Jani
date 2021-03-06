import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CardMedia } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerComponent() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [alignment, setAlignment] = useState("1");

  const { data } = useFetch("/category");

  const location = useLocation();
  const splitedPath = location.pathname.split("/");
  const endPoint = splitedPath[splitedPath.length - 1];

  useEffect(() => {

    console.log(endPoint);
    setAlignment(endPoint);
    console.log(alignment);
  }, [location]);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
      >

        <List sx={{mt:"auto"}}>
          {data?.data.map((item) => (
            <Link key={item.id} to={`/category/${item.id}`}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      maxWidth: "10%",
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="img"
                      width={"10%"}
                      image={`http://localhost:3002/files/${item.icon}`}
                      sx={{
                        borderRadius: "30px",
                        border:
                          item.id === alignment ? "solid 2px #1976D2" : null,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Link>
                  
          ))}
        </List>
        <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === "rtl" ? (
                        <IconButton onClick={handleDrawerClose}>
                          <ChevronRightIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleDrawerOpen}>
                          <ChevronLeftIcon />
                        </IconButton>
                      )}
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      sx={{
                        marginRight: 0,
                        ...(open && { display: "none" }),
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </DrawerHeader>
      </Drawer>
    </>
  );
}

