import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { ArrowsUp } from "./icons";

const Menu = () => {
  const icons = {
    arrowsUp: <ArrowsUp fill="currentColor" size={16} />,
  };

  return (
    <Navbar>
      <NavbarContent
        className="hidden sm:flex gap-4 text-xl text-black"
        color="#0a0a0a"
        justify="center"
      >
        {/* <Dropdown> */}
        {/* <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg"
                  startContent={icons.arrowsUp}
                  radius="sm"
                  variant="light"
                >
                  Filtros
                </Button>
              </DropdownTrigger>
            </NavbarItem> */}
        {/* <DropdownMenu
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="autoscaling">FILTRO</DropdownItem>
              <DropdownItem key="autoscaling">FILTRO</DropdownItem>
              <DropdownItem key="autoscaling">FILTRO</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        <NavbarItem className="ml-4">
          <Link
            href="/feed/nuevos-proyectos"
            className=" text-primary font-bold"
          >
            Nuevos proyectos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className=" text-primary font-bold ml-4" href="/feed/posts">
            Posts
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link className=" text-primaryfont-bold ml-4" isDisabled>
            Rating
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className=" text-primary font-bold ml-4"
            isDisabled
            href="/feed/mi-actividad"
          >
            Mi Actividad
          </Link>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
};

export default Menu;

//  return <div className="flex flex-row ml-8 mr-8 mb-4 bg-white"></div>;
