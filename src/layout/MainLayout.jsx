import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, Dashboard, Settings as SettingsIcon, Logout, WarningOutlined, ListAltOutlined, NotificationsOutlined, SummarizeOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { Outlet, NavLink, Link } from 'react-router-dom';

const drawerWidth = 240;

const navLinkStyles = {
    textDecoration: 'none',
    color: '#01225D',
    transition: 'all 0.5s ease',
};

// Navigation items from Sidebar
const navigationItems = [
    {
        text: "Dashboard",
        icon: <Dashboard />,
        path: "/"
    },
    {
        text: "Logs",
        icon: <ListAltOutlined />, 
        path: "/logs",
    },
    {
        text: "Anomalies",
        icon: <WarningOutlined />, 
        path: "/anomalies",
    },
    {
        text: "Alerts",
        icon: <NotificationsOutlined />,
        path: "/alerts"
    },
    {
        text: "Reports",
        icon: <SummarizeOutlined />,
        path: "/reports"
    },
];

export default function MainLayout() {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const notificationCount = 3; 

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'profile-menu';

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                    ml: isMobile ? 0 : `${drawerWidth}px`,
                    color: '#EDEDED',
                    background: '#FFF',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    {/* Logo */}
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                            SIEM TOOL 
                        </Link>
                    </Typography>

                    <IconButton color="black">
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsOutlined />
                        </Badge>
                    </IconButton>

                    <IconButton
                        color="black"
                        onClick={handleProfileMenuOpen}
                        aria-controls={menuId}
                        aria-haspopup="true"
                    >
                        <AccountCircleOutlined />
                    </IconButton>

                    {/* Profile Dropdown Menu */}
                    <Menu
                        id={menuId}
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{ marginTop: 5 }}
                    >
                        <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                            <Dashboard sx={{ mr: 1 }} /> Dashboard
                        </MenuItem>
                        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                            <AccountCircle sx={{ mr: 1 }} /> Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
                            <SettingsIcon sx={{ mr: 1 }} /> Settings
                        </MenuItem>
                        <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>
                            <Logout sx={{ mr: 1 }} /> Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: isMobile ? 0 : drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: '#EDEDED',
                        color: '#01225D',
                        boxSizing: 'border-box',
                    },
                    display: isMobile ? 'none' : 'block',
                }}
                variant={isMobile ? 'temporary' : 'permanent'}
                anchor="left"
                open={!isMobile}
            >
                <Toolbar />
                <List>
                    {navigationItems.map((navItem, index) => (
                        <NavLink to={navItem.path} key={index} style={navLinkStyles}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {navItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={navItem.text} />
                            </ListItemButton>
                        </NavLink>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    marginTop: '64px',
                    [theme.breakpoints.down('sm')]: {
                        marginTop: '56px',
                    },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
