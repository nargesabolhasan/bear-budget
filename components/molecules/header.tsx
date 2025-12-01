"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import Link from "next/link";
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
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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
    <MenuItem
      component={NextLink}
      href={item.href}
      className={twMerge(
        "!text-brown italic p-2 shadow shadow-brown !rounded-full mx-auto !m-3",
        item.color
      )}
    >
      {item.label}
    </MenuItem>
  );

  const DesktopNavItem = ({ item }: { item: NavItemType }) => (
    <NextLink
      className={twMerge(
        "text-brown shadow shadow-brown p-2 rounded-full hover:bg-primary_light",
        item.color
      )}
      href={item.href}
    >
      {item.label}
    </NextLink>
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
      <Toolbar className={"flex flex-row justify-between items-center py-6"}>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: '"PlaywriteNZGuides", sans-serif !important',
          }}
          className="w-fit text-brown cursor-pointer font-playwrite italic !text-2xl"
        >
          <Link href={"/"} className={"w-fit flex flex-row items-center"}>
            <Image src="/favicon.svg" alt="icon" width={50} height={50} />
            {title}
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className={"shadow shadow-brown p-2"}
            >
              <MenuIcon className={"text-brown"} />
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
