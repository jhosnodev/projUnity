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
import { getUsers, deleteUser, restoreUser } from "../../redux/actions/actionsDashboard";
import Loader from "../../components/layout/loader";

// const userData = [
//   {
//     id: 1,
//     name: "Juan Ponce",
//     email: "usuario1@example.com",
//     status: "Activo",
//     reasonForBlock: "Comportamiento inapropiado",
//     reasonForSuspension: "Incumplimiento de términos",
//     lastActivities: [
//       "Inició sesión a las 10:30 AM",
//       "Publicó un nuevo artículo a las 11:45 AM",
//       "Realizó una compra a las 2:15 PM",
//     ],
//   },
//   {
//     id: 2,
//     name: "María López",
//     email: "maria@example.com",
//     status: "Bloqueado",
//     reasonForBlock: "Violación de las políticas",
//     reasonForSuspension: null, // Este usuario no está suspendido
//     lastActivities: [
//       "Inició sesión a las 9:45 AM",
//       "Actualizó su perfil a las 10:30 AM",
//       "Envió un mensaje a las 12:15 PM",
//     ],
//   },
//   {
//     id: 3,
//     name: "Roberto Sánchez",
//     email: "roberto@example.com",
//     status: "Activo",
//     reasonForBlock: null, // Este usuario no está bloqueado
//     reasonForSuspension: null, // Este usuario no está suspendido
//     lastActivities: [
//       "Inició sesión a las 8:00 AM",
//       "Publicó una imagen a las 9:30 AM",
//       "Comentó en un artículo a las 11:45 AM",
//     ],
//   },
//   {
//     id: 4,
//     name: "Damian Magri",
//     email: "daminao@example.com",
//     status: "Suspendido",
//     reasonForBlock: null, // Este usuario no está bloqueado
//     reasonForSuspension: "Inactividad por 30 dias", // Este usuario no está suspendido
//     lastActivities: null,
//   },
// ];

export default function GestionUsuarios() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

const userData = useSelector((state) => state.userDashboard.dataUsers)

const loading = useSelector((state) => state.userDashboard.loading);
  if (loading) return <Loader />;


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
        dispatch(deleteUser(userId));
        Swal.fire("Bloqueado", "El usuario ha sido bloqueado.", "success");
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
        Swal.fire("Desbloqueado", "El usuario ha sido desbloqueado.", "success");
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
              <Th>Correo Electrónico</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {userData.map((user) => (
              <Tr key={user.id} className={user.status === 'Bloqueado' ? 'bloqueado' : ''}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.status}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => blockUser(user.id)}
                    disabled={user.status === 'Bloqueado'}
                  >
                    Bloquear
                  </Button>
                  {/* <Link href={`/admin/detallesActividadUser?id=${user.id}`}>
                    <Button size="sm" colorScheme="blue" ml="2">
                      Detalles
                    </Button>
                  </Link> */}
                  <Button
                    colorScheme="blue"
                    size="sm"
                    ml="2"
                    onClick={() => restoreUsers(user.id)}
                    disabled={user.status !== 'Bloqueado'}
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
