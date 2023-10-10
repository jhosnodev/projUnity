import React from "react";
import { Box, Text, Button, Avatar, Image, Link } from "@chakra-ui/react";

const userData = [
  {
    id: 1,
    name: "Juan Ponce",
    email: "usuario1@example.com",
    role: "Miembro",
    status: "Activo",
    bio: "UX Designer",
    projectsCount: 50,
    earnings: "$5,000",
  },
  {
    id: 2,
    name: "Maria Perez",
    email: "usuario2@example.com",
    role: "Usuario Premium",
    status: "Bloqueado",
    bio: "Software Developer",
    projectsCount: 50,
    earnings: "$5,000",
  },
  // Agrega más usuarios aquí
];

export default function UsuarioCard() {
  return (
    
    <Box
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      borderRadius="0.25rem" // Agrega el valor de tu borde
      borderWidth="0"
      borderColor="#f6f6f6"
      minW="500px"
      h="var(--bs-card-height)"
      bg="#fff"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        mt="-1 * var(--bs-gutter-y)"
        mr="-0.5 * var(--bs-gutter-x)"
        ml="-0.5 * var(--bs-gutter-x)"
        bg="customLightPurple"
        height="150px"
      >
        <Box
          p="10"
          roundedTopLeft="lg"
          roundedTopRight="lg"
          position="relative"
          width="58.33333333%"
          fontWeight="600"
        >
          <Text fontSize="2xl">Usuario del Mes</Text>
          <Text fontSize="md">{userData[0].name}</Text>
        </Box>
        <Box>
          <Image
            src="https://themesbrand.com/skote/layouts/assets/images/profile-img.png"
            boxSize="180px"
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        mt="-1 * var(--bs-gutter-y)"
        mr="-0.5 * var(--bs-gutter-x)"
        ml="-0.5 * var(--bs-gutter-x)"
      >
        <Box flex="0 0 auto" width="38.33333%">
          <Avatar
            size="xl"
            name="Usuario"
            src="url_de_la_foto"
            mt="-26"
            border="6px solid #fff"
            bg="customBlue"
          />
          <Text fontSize="lg" overflow="hidden" p="3">
            {userData[0].role}
          </Text>
          <Text fontSize="md" pl="3" pb="3">
            {userData[0].bio}
          </Text>
        </Box>
        <Box>
          <Box display="flex" flexWrap="wrap" alignItems="center">
            <Box display="grid" ml="20px" mr="40px" mt="10px">
              <Text fontSize="lg" fontWeight="500">
                {userData[0].projectsCount}
              </Text>
              <Text fontSize="md">Proyectos</Text>
            </Box>
            <Box diplay="grid" ml="20px" mr="40px" mt="10px">
              <Text fontSize="lg" fontWeight="500">
                {userData[0].earnings}
              </Text>
              <Text fontSize="md">Ganancias</Text>
            </Box>
          </Box>
          <Link href="/admin/gananciasUser">
            <Button
              mt="6"
              className="bg-gradient-to-tr from-orange-400 to-orange-600 text-white hover:bg-orange-300"
              width="60%"
              borderRadius="lg"
              size="md"
              ml="50px"
            >
              Ver Ganancias
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
