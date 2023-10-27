import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  restoreUser,
} from "../../redux/actions/actionsDashboard";
import Loader from "../../components/layout/loader";
import { getSesion } from "../../redux/actions/actionsUser";


export default function GestionUsuarios() {

  const dispatch = useDispatch();
  
 
  React.useEffect(() => {
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    console.log(sesion)
    if (sesion.id) {
      console.log(sesion.id)
      dispatch(getUsers());
    //   dispatch(getSesion());
    }
  }, [dispatch]);

  const userData = useSelector((state) => state.userDashboard.dataUsers);
  console.log(userData);

  const loading = useSelector((state) => state.userDashboard.loading);
  if (loading) return <Loader />;

  // const sesionId = useSelector((state) => state.usersData.sesion)

  const blockUser = (userId) => {
    // Mostrar una alerta de SweetAlert2 para confirmar el bloqueo del usuario
    Swal.fire({
      title: "Bloquear usuario",
      text: "¿Estás seguro de que deseas bloquear a este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bloquear",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // if (typeof sesionId?.access === false) {
        //   Swal.fire({
        //     icon: "warning",
        //     title: "Inicia sesión para seguir con la compra",
        //     footer: '<a href="/auth/login">Por que no te loggeas primero?</a>',
        //   });
        // } else {
        dispatch(deleteUser(userId));
        Swal.fire("Bloqueado", "El usuario ha sido bloqueado.", "success");
        // }
      }
    });
  };

  const restoreUsers = (userId) => {
    Swal.fire({
      title: "Desbloquear usuario",
      text: "¿Estás seguro de que deseas desbloquear a este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desbloquear",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(restoreUser(userId));
        Swal.fire(
          "Desbloqueado",
          "El usuario ha sido desbloqueado.",
          "success"
        );
      }
    });
  };

  return (
    <HeadFooter>
      <Box m="6">
        <Flex justify="space-between" mb="4">
          <Heading as="h2" size="md">
            Gestión de Usuarios
          </Heading>
          <Flex>
            <Input placeholder="Buscar usuario" mr="2" />
            <Select placeholder="Filtrar por Estado">
              <option value="activo">Activos</option>
              <option value="bloqueado">Bloqueados</option>
            </Select>
          </Flex>
        </Flex>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th width="20%">Correo Electrónico</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {userData?.map((user) => (
              <Tr
                key={user.id}
                style={{
                  backgroundColor: user.isBlocked ? "gray" : "transparent",
                }}
              >
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.isBlocked ? "Bloqueado" : "Activo"}</Td> 
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => blockUser(user.id)}
                    isDisabled={user.isDisabled}
                  >
                    Bloquear
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    ml="2"
                    onClick={() => restoreUsers(user.id)}
                    isDisabled={!user.isBlocked}
                  >
                    Desbloquear
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Link href="/admin">
          <Box textAlign="right" m="4">
            <Button colorScheme="orange">Volver al Perfil</Button>
          </Box>
        </Link>
      </Box>
    </HeadFooter>
  );
}
