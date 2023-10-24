import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu
} from "@nextui-org/react";
import { Inter, Montserrat } from "next/font/google";
import Footer from "../layout/footer";
import Head from "next/head";
import Logo from "../layout/Logo";
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./icons";
import { useRouter } from "next/router";

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
  const icons = {
    chevron: <ChevronDown fill="#27187E" size={18} />,
    scale: <Scale className="text-warning" fill="#758BFD" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="#27187E" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="#27187E" size={30} />,
    user: <TagUser className="text-danger" fill="#FF8600" size={30} />,
  };
  const router = useRouter();


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
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color="#27187E"
              >
                Usuarios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
              <DropdownItem
              key="supreme_support"
              startContent={icons.user}
              onClick={() => {
                router.push("/admin/gestionUsers"); // Reemplaza con la ruta correcta
              }}
            >
              Gestión
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              startContent={icons.activity}
              onClick={() => {
                router.push("/admin/historialUser");
              }}
            >
              Historial
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              startContent={icons.scale}
              onClick={() => {
                router.push("/admin/reportesUser");
              }}
            >
              Reportes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> 
        <Dropdown backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color="#27187E"
              >
                Proyectos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
              <DropdownItem
              key="supreme_support"
              startContent={icons.user}
              onClick={() => {
                router.push("/admin/gestionProyectos");
              }}
            >
              Gestión
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              startContent={icons.activity}
              onClick={() => {
                router.push("/admin/historialProyectos");
              }}
            >
              Historial
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              startContent={icons.scale}
              onClick={() => {
                router.push("/admin/reportesProyectos");
              }}
            >
              Reportes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> 
        <Dropdown backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color="#27187E"
              >
                Ganancias
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="usage_metrics"
              startContent={icons.activity}
              onClick={() => {
                router.push("/admin/historialGanancias");
              }}
            >
              Historial
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              startContent={icons.scale}
              onClick={() => {
                router.push("/admin/reportesGanancias");
              }}
            >
              Reportes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> 
        <Dropdown backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color="#27187E"
              >
                Comentarios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="usage_metrics"
              startContent={icons.activity}
              onClick={() => {
                router.push("/admin/historialComentarios");
              }}
            >
              Historial
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              startContent={icons.scale}
              onClick={() => {
                router.push("/admin/reportesComentarios");
              }}
            >
              Reportes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> 
        </NavbarContent> 
      </Navbar>
      {children}
      <footer className="w-full bg-primary py-6 text-slate-50 ">
        <Footer />
      </footer>
    </div>
  );
};

export default HeadFooter;