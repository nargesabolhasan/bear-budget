"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Grid, Layout, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { NavItemType } from "@/types/global";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export type HeaderType = {
  navItems: NavItemType[];
  title?: string;
};
export default function IHeader({
  navItems,
  title = "Bear budget",
}: HeaderType) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const menuItems = navItems.map(({ label, key, href }) => ({
    key,
    label: <Link href={href}>{label}</Link>,
  }));

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#001529",
      }}
    >
      <Typography.Title level={3} style={{ color: "#fff", margin: 0 }}>
        {title}
      </Typography.Title>

      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "#fff", fontSize: 24 }} />}
            onClick={() => setDrawerOpen(true)}
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
          >
            <Menu
              mode="vertical"
              items={menuItems}
              onClick={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={menuItems}
          style={{ backgroundColor: "transparent" }}
        />
      )}
    </Header>
  );
}
