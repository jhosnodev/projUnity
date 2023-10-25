import { Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SideBar({ adminName, adminAvatar }) {
  const router = useRouter();

  // Función para manejar el cierre de sesión
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

  return (
    <Box
      width="200px"
      height="100vh"
      bg="gray.200"
      p="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Avatar size="lg" name={adminName} src={adminAvatar} mb="4" />
      <Text fontWeight="bold">{adminName}</Text>
      <Button
        className="bg-gradient-to-tr from-orange-400 to-orange-600 text-white hover:bg-orange-300"
        onClick={handleLogout}
        width="80%"
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
}

export default SideBar;
