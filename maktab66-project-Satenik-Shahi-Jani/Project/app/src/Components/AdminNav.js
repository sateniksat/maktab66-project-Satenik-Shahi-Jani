import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logo from "../assets/images/shop.png";
import { Link } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import { addtoken } from "../redux/tokenslice";
import { api } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const ITEM_HEIGHT = 48;

export function AdminNav() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const splitedPath = location.pathname.split(/[-/]/);
  const endPoint = splitedPath[splitedPath.length - 1];

  const [alignment, setAlignment] = useState("productmanagement");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    setAlignment(endPoint);
  }, [endPoint]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Token");
    dispatch(addtoken(false));
    api.configuration();
    navigate("/");
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
        <Toolbar>
          <Tooltip title="???????? ???? ???????? ????????">
            <Link to="/" style={{ width: "5%" }}>
              <img
                alt="logo"
                src={Logo}
                width="100%"
                style={{ backgroundColor: "#ffffff9f", borderRadius: "10px" }}
              />
            </Link>
          </Tooltip>
          <Typography
            dir="rtl"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, p: "2%" }}
          >
            ?????? ???????????? ??????????????
          </Typography>
          {/* <Box sx={{ bgcolor: "#ffff", borderRadius: "10px" }}> */}
          <ToggleButtonGroup
            color="primary"
            sx={{ bgcolor: "#ffff", borderRadius: "10px" }}
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="productmanagement">
              <Link to="/admin-productmanagement">???????? ????</Link>
            </ToggleButton>
            <ToggleButton value="inventory">
              <Link to="/admin-inventory">???????????? ?? ???????? ???? </Link>
            </ToggleButton>
            <ToggleButton value="orders">
              <Link to="/admin-orders">?????????? ???? </Link>
            </ToggleButton>
          </ToggleButtonGroup>
          {/* </Box> */}
          <Link to="/">
            <Button color="inherit"> ???????????? ???? ????????</Button>
          </Link>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleLogOut} dir={"rtl"}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              ????????
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AdminNav;
