"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavItemType } from "@/types/global";

export type HeaderProps = {
  title?: string;
  navItems: NavItemType[];
};

const IHeader = ({ navItems, title = "Bear Budget" }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const DrawerNavItem = ({ item }: { item: NavItemType }) => (
    <MenuItem component={NextLink} href={item.href}>
      {item.label}
    </MenuItem>
  );

  const DesktopNavItem = ({ item }: { item: NavItemType }) => (
    <NextLink href={item.href}>{item.label}</NextLink>
  );

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <DrawerNavItem key={item.key} item={item} />
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" className={"print:!hidden"}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box className={"flex gap-3"}>
            {navItems.map((item) => (
              <DesktopNavItem key={item.key} item={item} />
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default IHeader;
