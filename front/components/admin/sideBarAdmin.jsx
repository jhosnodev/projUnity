import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import Link from "next/link"; // Importa Link de Next.js

export default function SideBar() {
  return (
    <Box w="200px" bg="gray.200" p="4">
      <Heading size="md">Usuarios</Heading>
      <List pl="3" mt="1">
        <Link href="/usuarios/gestion">
          <ListItem cursor="pointer">Gestión</ListItem>
        </Link>
        <Link href="/usuarios/historial">
          <ListItem cursor="pointer">Historial</ListItem>
        </Link>
        <Link href="/usuarios/reportes">
          <ListItem cursor="pointer">Reportes</ListItem>
        </Link>
      </List>
      <Heading size="md" mt="3">
        Proyectos
      </Heading>
      <List pl="3" mt="1">
        <Link href="/proyectos/gestion">
          <ListItem cursor="pointer">Gestión</ListItem>
        </Link>
        <Link href="/proyectos/historial">
          <ListItem cursor="pointer">Historial</ListItem>
        </Link>
        <Link href="/proyectos/reportes">
          <ListItem cursor="pointer">Reportes</ListItem>
        </Link>
      </List>
      <Heading size="md" mt="3">
        Ganancias
      </Heading>
      <List pl="3" mt="1">
        <Link href="/ganancias/gestion">
          <ListItem cursor="pointer">Gestión</ListItem>
        </Link>
        <Link href="/ganancias/historial">
          <ListItem cursor="pointer">Historial</ListItem>
        </Link>
        <Link href="/ganancias/reportes">
          <ListItem cursor="pointer">Reportes</ListItem>
        </Link>
      </List>
      <Heading size="md" mt="3">
        Comentarios
      </Heading>
      <List pl="3" mt="1">
        <Link href="/comentarios/historial">
          <ListItem cursor="pointer">Historial</ListItem>
        </Link>
        <Link href="/comentarios/reportes">
          <ListItem cursor="pointer">Reportes</ListItem>
        </Link>
      </List>
    </Box>
  );
}
