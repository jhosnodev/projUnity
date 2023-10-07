import React from "react";
import {
  Navbar,
  NavbarBrand,
  Link,
} from "@nextui-org/react";
import { Inter, Montserrat } from "next/font/google";
import Footer from "../footer";
import Head from "next/head";
import Logo from "../Logo";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const HeadFooter = ({ children }) => {
  return (
    <div
      className={`indigo-light text-foreground bg-background ${inter.className}`}
    >
      <Head>
        <title>ProjUnity | Dashboard</title>
      </Head>
      <Navbar className="border-b-1 border-primary shadow-md shadow-indigo-500/40 justify-between w-full ">
        <NavbarBrand className="cursor-pointer">
          <Link color="foreground" href="/">
            <Logo measures={21} /> <b className="ml-2">ProjUnity</b>
          </Link>
        </NavbarBrand>
       
      </Navbar>
      {children}
      <footer className="w-full bg-primary py-6 text-slate-50 ">
        <Footer />
      </footer>
    </div>
  );
};

export default HeadFooter;