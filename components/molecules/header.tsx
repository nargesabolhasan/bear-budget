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
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { NavItemType } from "@/types/global";
import { usePathname } from "next/navigation";
import { navItems } from "@/constant/navItems";
import i18n from "i18next";

export type HeaderProps = {
  title?: string;
};

const IHeader = ({ title = "Bear Budget" }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Drawer Nav Item in mobile view
  const DrawerNavItem = ({ item }: { item: NavItemType }) => {
    const isActive = pathname === item.href;
    return (
      <MenuItem
        component={NextLink}
        href={item.href}
        className={twMerge(
          "!text-brown_secondary italic p-2 shadow shadow-brown_secondary !rounded-full mx-auto !m-3 transition",
          item.color,
          isActive && "!bg-primary !text-brown font-bold !border border-brown"
        )}
      >
        {item.label}
      </MenuItem>
    );
  };

  // -----------------------------
  // Desktop Nav Item
  // -----------------------------
  const DesktopNavItem = ({ item }: { item: NavItemType }) => {
    const isActive = pathname === item.href;

    return (
      <NextLink
        href={item.href}
        className={twMerge(
          "flex items-center justify-center text-center text-brown shadow shadow-brown p-2 rounded-full hover:bg-primary_light transition",
          item.color,
          isActive && "bg-primary_light font-bold border border-brown"
        )}
      >
        {item.label}
      </NextLink>
    );
  };

  // Drawer
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
    <AppBar position="fixed" className="top-0 w-full z-50 print:!hidden">
      <Toolbar className="flex flex-row justify-around gap-5 md:gap-0 md:justify-between items-center py-6">
        {/* Logo + Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: '"PlaywriteNZGuides", sans-serif !important',
          }}
          className="w-fit text-brown cursor-pointer font-playwrite italic !text-2xl"
        >
          <NextLink href="/" className="w-fit flex flex-row items-center gap-1">
            <Image src="/favicon.svg" alt="icon" width={50} height={50} />
            {title}
          </NextLink>
        </Typography>

        {/* Mobile Drawer */}
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="shadow shadow-brown p-2"
            >
              <MenuIcon className="text-brown" />
            </IconButton>

            <Drawer
              anchor={"right"}
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          // Desktop Navigation
          <Box className="flex gap-3">
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
