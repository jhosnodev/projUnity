import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input
} from "@nextui-org/react";

import Head from "next/head";

const LayoutUser = ({ children }) => {
  return (
    <div className="indigo-light text-foreground bg-background">
      <Head></Head>
      <Navbar className="border-b-1 border-primary shadow-md shadow-indigo-500/40 ">
        <NavbarBrand>
          <Link color="foreground" href="/">
            ProjUnity
          </Link>
        </NavbarBrand>
        <NavbarContent  className="hidden sm:flex gap-4" justify="right">
          <NavbarItem>
            <Link color="foreground" href="/browser">
              Browser
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/feed">Feed</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/community">
              Community
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="center">
          <Input placeholder="Buscar proyecto, categoria, tags...." type='text'  />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      {children}

      <footer className="w-full bg-primary py-6 text-slate-50 ">Este es un footer</footer>
    </div>
  );
};

export default LayoutUser;
