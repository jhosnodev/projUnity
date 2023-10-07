import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

export default function SideBar () {
    return (
        <Box w="200px" bg="gray.200" p="4">
        <Heading size="md">Usuarios</Heading>
        <List pl="3" mt="1">
          <ListItem>Gestión</ListItem>
          <ListItem>Historial</ListItem>
          <ListItem>Reportes</ListItem>
        </List>
        <Heading size="md" mt="3">
          Proyectos
        </Heading>
        <List pl="3" mt="1">
          <ListItem>Gestión</ListItem>
          <ListItem>Historial</ListItem>
          <ListItem>Reportes</ListItem>
        </List>
        <Heading size="md" mt="3">
          Ganancias
        </Heading>
        <List pl="3" mt="1">
          <ListItem>Gestión</ListItem>
          <ListItem>Historial</ListItem>
          <ListItem>Reportes</ListItem>
        </List>
        <Heading size="md" mt="3">
          Comentarios
        </Heading>
        <List pl="3" mt="1">
          <ListItem>Historial</ListItem>
          <ListItem>Reportes</ListItem>
        </List>
      </Box>
    )
}

