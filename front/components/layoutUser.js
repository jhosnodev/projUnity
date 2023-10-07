import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Inter, Montserrat } from "next/font/google";
import Footer from "./footer";
import Head from "next/head";
import Logo from "./Logo";

import SearchBar from "./SearchBar";
import Carrito from "./carrito";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const LayoutUser = ({ children }) => {
  return (
    <div
      className={`indigo-light text-foreground bg-background ${inter.className}`}
    >
      <Head>
        <title>ProjUnity</title>
      </Head>
      <Navbar className="border-b-1 border-primary shadow-md shadow-indigo-500/40 justify-between w-full ">
        <NavbarBrand className="cursor-pointer">
          <Link color="foreground" href="/">
            <Logo measures={21} /> <b className="ml-2">ProjUnity</b>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex " justify="start ">
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
        <NavbarContent className="hidden flex w-full" justify="center">
          <SearchBar />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
           <Carrito/>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="indigo-light bg-primary text-background"
              href="#"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {children}
      <footer className="w-full bg-primary py-6 text-slate-50 ">
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutUser;

