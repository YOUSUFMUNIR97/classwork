import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from './Notification';
import PostScreen from './PostScreen';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Button, InputBase } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BAButton from '../Componets/BAButton';
import { fbLogin } from '../Config/Firebasemethod';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import QuizIcon from '@mui/icons-material/Quiz';
import Login from './Login';
import Adminpanel from './Adminpanel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Message from '../Message';


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  // screen: any;
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function Dashboard(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [model, setmodel] = React.useState<any>({})
  const [pagesArr, setPagesArr] = React.useState([
    {
      name: "Admin Panel",
      route: "admin",
      icon: <AdminPanelSettingsIcon />,
    },
    {
      name: "HTML",
      route: "HTML",
      icon: <HtmlIcon />,
    },
    {
      name: "CSS",
      route: "CSS",
      icon: <CssIcon />,
    },
    {
      name: "JS Quiz 1",
      route: "QUIZ1",
      icon: <QuizIcon  />,
    },
    {
      name: "JS Quiz 2",
      route: "QUIZ2",
      icon: <QuizIcon />,
    },

  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate()

  const openPage = (route: any) => {
    navigate(`/dashboard/${route}`);
  };
  
    const logoutuser = () => {
        console.log(model);
        fbLogin(model).then((
            res => {navigate("login")}
        )).catch((err)=>{
            console.log(err)
        })
    }
  const drawer = (
    <div>
      <Avatar style={{alignItems:"center" }}alt="Remy Sharp" src="https://tse1.mm.bing.net/th?id=OIP.aPrAXebVFheO1nA-8qU47gHaJA&pid=Api&rs=1&c=1&qlt=95&w=87&h=106" />
      {/* <h1 style={{ fontSize: "25px", textAlign: "center"  }}>QUIZ APPLICATION</h1> */}
      {/* <Toolbar /> */}
      <List style={{
        backgroundColor: "white"
      }}>
        {pagesArr.map((x, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => openPage(x.route)}>
              <ListItemIcon>{x.icon ? x.icon : <MailIcon />}</ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <BAButton onClick={logoutuser} label='Logout'/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;



  return (
    <Box sx={{ display: 'flex', boxShadow: "none" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
        }}
      
      >
        <Toolbar style={{
          backgroundColor: "#d3d3d3",
          boxShadow: "none"
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ display: 'flex' }} variant="h6" noWrap component="div" >
            <h1 style={{ width: '1000px', height: '75px', marginTop: '30px' }}>QUIZ APP ADMIN</h1>
            {/* <Search style={{ width: '1000px', height: '50px', marginTop: '5px' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth }, flexShrink: { sm: 0 }, height: "100vh",
          backgroundColor: "#d3d3d3",
        }}
        aria-label="mailbox folders"

      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          style={{
            height: "100vh",
            backgroundColor: "#d3d3d3",
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          style={{
            backgroundColor: "#d3d3d3"
          }}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        style={{
          backgroundColor: "#d3d3d3"
        }}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="message" element={<Message />} />
          <Route path="notification" element={<Notification />} />
          <Route path="post" element={<PostScreen />} />
          <Route path="admin" element={<Adminpanel />} />
          {/* <Route path="singlePost/:id" element={<Singlepost />} /> */}
        </Routes>
      </Box>
    </Box >
  );
}