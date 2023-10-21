import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
/* import { Montserrat } from "next/font/google"; */
import Footer from "./footer";
import Head from "next/head";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Carrito from "./carrito";
import { getSesion, logout } from "../../redux/actions/actionsUser";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// If loading a variable font, you don't need to specify the font weight
/* const inter = Inter({
  subsets: ["latin"],
  display: "swap",
}); */
/* const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
}); */

const LayoutUser = ({ children }) => {
  const router = useRouter();

  /* console.log(sesion); */

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.usersData.alert);

  React.useEffect(() => {
    dispatch(getSesion());

  }, [dispatch]);

  const sesion = useSelector((state) => state.usersData.sesion);
  /*   console.log(sesion); */

  const handleLogout = () => {
    dispatch(logout());
    if (alert.type === "success") {
      Swal.fire({
        icon: "info",
        title: "Has cerrado sesión",
        text: "Vuelve pronto!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (alert.type === "error") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: alert.msg,
      });
    }
  };

  const handleDashboard = () => {
    if (sesion.role === "admin") {
      alert("eres admin, wiii!");
    } else {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permiso para acceder a esta página.",
      });
    }
  };

  return (
    <div className={`indigo-light text-foreground bg-background ${""}`}>
      <Head>
        <title>ProjUnity</title>
      </Head>
      <Navbar className="border-b-1 border-primary shadow-md shadow-indigo-500/40 justify-between w-full ">
        <NavbarBrand className="cursor-pointer">
          <Link color="foreground" href="/">
            <Logo measures={21} /> <b className="ml-2">ProjUnity</b>
          </Link>
        </NavbarBrand>
        <NavbarContent className="sm:hidden sm:flex " justify="start ">
          <NavbarItem>
            <Link color="foreground" href="/browser">
              Proyectos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/feed">Novedades</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/community">
              Comunidad
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden flex w-full" justify="center">
          <SearchBar />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Carrito />
          </NavbarItem>
          {sesion?.access ? (
            <>
              <Dropdown>
                <DropdownTrigger className="cursor-pointer">
                  <Button variant="light">
                    <User
                      name={sesion?.name}
                      avatarProps={{
                        src: sesion?.image,
                      }}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new" onClick={handleDashboard}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem key="copy">Mis proyectos</DropdownItem>
                  <DropdownItem key="edit">Editar perfil</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/auth/login">Iniciar sesión</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  className="indigo-light bg-primary text-background"
                  href="/auth/register"
                  variant="flat"
                >
                  Registrarse
                </Button>
              </NavbarItem>
            </>
          )}
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