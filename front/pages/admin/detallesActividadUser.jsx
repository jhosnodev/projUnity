import React from "react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Badge,
  Button,
  Link,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeadFooter from "../../components/admin/HeadAndFooter";
import { MdCheckCircle } from "react-icons/md";

const userData = [
    {
      id: 1,
      name: "Juan Ponce",
      email: "usuario1@example.com",
      status: "Activo",
      reasonForBlock: "Comportamiento inapropiado",
      reasonForSuspension: "Incumplimiento de términos",
      lastActivities: [
        "Inició sesión a las 10:30 AM",
        "Publicó un nuevo artículo a las 11:45 AM",
        "Realizó una compra a las 2:15 PM",
      ],
    },
    {
      id: 2,
      name: "María López",
      email: "maria@example.com",
      status: "Bloqueado",
      reasonForBlock: "Violación de las políticas",
      reasonForSuspension: null, // Este usuario no está suspendido
      lastActivities: [
        "Inició sesión a las 9:45 AM",
        "Actualizó su perfil a las 10:30 AM",
        "Envió un mensaje a las 12:15 PM",
      ],
    },
    {
      id: 3,
      name: "Roberto Sánchez",
      email: "roberto@example.com",
      status: "Activo",
      reasonForBlock: null, // Este usuario no está bloqueado
      reasonForSuspension: null, // Este usuario no está suspendido
      lastActivities: [
        "Inició sesión a las 8:00 AM",
        "Publicó una imagen a las 9:30 AM",
        "Comentó en un artículo a las 11:45 AM",
      ],
    },
    {
      id: 4,
      name: "Damian Magri",
      email: "daminao@example.com",
      status: "Suspendido",
      reasonForBlock: null, // Este usuario no está bloqueado
      reasonForSuspension: "Inactividad por 30 dias", // Este usuario no está suspendido
      lastActivities: null
    },
  ];

const UserDetailsPage = () => {
    const router = useRouter();
  const { id } = router.query; 

  const user = userData.find((u) => u.id == id)

  
  if (!user) {
    // Manejar el caso en que no haya un usuario seleccionado
    return <div>Selecciona un usuario para ver detalles.</div>;
  }

  return (
    <HeadFooter>
      <Box m="8">
        <Heading as="h2" size="md">
          Detalles del Usuario
        </Heading>
        <Table variant="striped">
          <Tbody bg="gray.300">
            <Tr>
              <Td fontWeight="bold">Nombre:</Td>
              <Td>{user.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Email:</Td>
              <Td>{user.email}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Estado:</Td>
              <Td>
                <Badge
                  colorScheme={user.status === "Activo" ? "green" : "red"}
                >
                  {user.status}
                </Badge>
              </Td>
            </Tr>
            {user.status === "Bloqueado" && (
              <Tr>
                <Td fontWeight="bold">Motivo de Bloqueo:</Td>
                <Td>{user.reasonForBlock}</Td>
              </Tr>
            )}
            {user.status === "Suspendido"  && (
              <Tr>
                <Td fontWeight="bold">Motivo de Suspensión:</Td>
                <Td>{user.reasonForSuspension}</Td>
              </Tr>
            )}
            {user.status === "Activo" && (
            <Tr>
              <Td fontWeight="bold">Últimas Actividades:</Td>
              <Td>
                <List spacing={3}>
                  {user.lastActivities.map((activity, index) => (
                    <ListItem key={index}>
                        <ListIcon as={MdCheckCircle} color='purple.500' />
                        {activity}
                    </ListItem>
                  ))}
                </List>
              </Td>
            </Tr>
            )}
          </Tbody>
        </Table>
        <Link href="/admin/gestionUsers">
        <Box textAlign="right" m="4">
          <Button colorScheme="orange" borderRadius="lg">
            Volver a Gestion
          </Button>
        </Box>
        </Link>
      </Box>
    </HeadFooter>
  );
                  }

export default UserDetailsPage;
