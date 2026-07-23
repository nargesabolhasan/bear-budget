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
import { useTranslation } from "react-i18next";

export type HeaderProps = {
  title?: string;
};

const IHeader = ({ title = "Bear Budget" }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Drawer Nav Item in mobile view
  const DrawerNavItem = ({ item }: { item: NavItemType }) => {
    const isActive = pathname === item.href;
    const Icon = item?.icon;
    return (
      <MenuItem
        component={NextLink}
        href={item.href}
        className={twMerge(
          "!text-brown_secondary shadow-brown_secondary !m-3 mx-auto !rounded-full p-2 italic shadow transition",
          item.color,
          isActive && "!bg-primary !text-brown border-brown !border font-bold",
        )}
      >
        {Icon && (
          <Icon
            size="25"
            color="var(--color-brown)"
            variant="Outline"
            className={"mx-1"}
          />
        )}
        {t(item.labelKey)}
      </MenuItem>
    );
  };

  // -----------------------------
  // Desktop Nav Item
  // -----------------------------
  const DesktopNavItem = ({ item }: { item: NavItemType }) => {
    const isActive = pathname === item.href;
    const Icon = item?.icon;
    return (
      <NextLink
        href={item.href}
        className={twMerge(
          "text-brown shadow-brown hover:bg-primary_light flex items-center justify-center rounded-full p-2 text-center shadow transition",
          item.color,
          isActive && "bg-primary_light border-brown border font-bold",
        )}
      >
        {Icon && (
          <Icon
            size="25"
            color="var(--color-brown)"
            variant="Outline"
            className={"mx-1"}
          />
        )}
        {t(item.labelKey)}
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
    <AppBar position="fixed" className="top-0 z-50 w-full print:!hidden">
      <Toolbar className="flex flex-row items-center justify-around gap-5 py-6 md:justify-between md:gap-0">
        {/* Logo + Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: '"PlaywriteNZGuides", sans-serif !important',
          }}
          className="text-brown font-playwrite w-fit cursor-pointer !text-2xl italic"
        >
          <NextLink href="/" className="flex w-fit flex-row items-center gap-1">
            <Image
              src="/favicon.svg"
              alt="icon"
              width={50}
              height={50}
              priority
              unoptimized
            />
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
              className="shadow-brown p-2 shadow"
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
