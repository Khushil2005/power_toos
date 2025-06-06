import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useLocation } from 'react-router-dom';
import path from '../Common/Path';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import CollectionsIcon from '@mui/icons-material/Collections';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

export default function Layout({ component, UserInfo }) {
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    React.useEffect(() => {
        if (!localStorage.getItem("token")) {
            Navigate(path.login)
        }
    }, [localStorage.getItem("token")])

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <Link to={path.dashboard}>
                        <ListItemButton selected={location.pathname === path.dashboard}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to={path.category}>
                        <ListItemButton selected={location.pathname === path.category}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Category"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to={path.gallery}>
                        <ListItemButton selected={location.pathname === path.gallery}>
                            <ListItemIcon>
                                <CollectionsIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Gallery"} />
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem disablePadding>
                    <Link to={path.product}>
                        <ListItemButton selected={location.pathname === path.product}>
                            <ListItemIcon>
                                <Inventory2Icon />
                            </ListItemIcon>
                            <ListItemText primary={"Product"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to={path.order}>
                        <ListItemButton selected={location.pathname === path.order}>
                            <ListItemIcon>
                                <ShoppingBagIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Order"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to={path.user}>
                        <ListItemButton selected={location.pathname === path.user}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={"User"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>

        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: "100%" },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: 1300
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        PowerTools Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true, // Better open performance on mobile.
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
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
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {
                    component
                }
            </Box>
        </Box>
    );
}



