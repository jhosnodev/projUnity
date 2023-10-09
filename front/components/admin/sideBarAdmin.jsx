import { Box, Button, Avatar, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SideBar({ adminName, adminAvatar }) {
  const router = useRouter();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Coloca aquí la lógica para cerrar sesión, por ejemplo, eliminando las cookies o el token de autenticación.
    // Luego redirige a la página de inicio de sesión o a donde corresponda.
    // Ejemplo:
    // removeAuthToken();
    // router.push("/login");
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
        mt="4"
        colorScheme="red"
        onClick={handleLogout}
        size="sm"
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
}

export default SideBar;
