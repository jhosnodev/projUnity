import React from "react";
import { Box, Text, Avatar, Image, Link, Button } from "@chakra-ui/react";

// const userData = [
//   {
//     id: 1,
//     name: "Juan Ponce",
//     email: "usuario1@example.com",
//     role: "Miembro",
//     status: "Activo",
//     bio: "UX Designer",
//     projectsCount: 50,
//     earnings: "$5,000",
//   },
//   {
//     id: 2,
//     name: "Maria Perez",
//     email: "usuario2@example.com",
//     role: "Usuario Premium",
//     status: "Bloqueado",
//     bio: "Software Developer",
//     projectsCount: 50,
//     earnings: "$5,000",
//   },
//   // Agrega más usuarios aquí
// ];

export default function UsuarioCard({userDashboardData}) {
  return (
    
    <Box
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      borderRadius="0.25rem"
      borderWidth="0"
      borderColor="#f6f6f6"
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
          <Text fontSize="md">{userDashboardData.userData.name}</Text>
        </Box>
        <Box>
          <Image
            src="https://themesbrand.com/skote/layouts/assets/images/profile-img.png"
            boxSize="180px"
            objectFit="contain"
            alt={`perfil de ${userDashboardData.userData.name}`}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        mt="-1 * var(--bs-gutter-y)"
        mr="-0.5 * var(--bs-gutter-x)"
        ml="-0.5 * var(--bs-gutter-x)"
        className="w-full
        "
      >
        <Box flex="0 0 auto" width="38.33333%" className="p-4">
          <Avatar
            size="xl"
            name="Usuario"
            src="url_de_la_foto"
            mt="-26"
            mb={4}
            border="6px solid #fff"
            bg="customBlue"
          />
          <Text fontSize="md" pl="3" pb="3" fontWeight="500">
            GitHub: {userDashboardData.userData.bio.githubUser}
          </Text>
        </Box>
        <Box className="p-6 flex flex-col justify-evenly ">
          <Box display="flex" flexWrap="wrap" alignItems="center" >
            <Box display="grid" ml="20px" mr="40px" mt="10px" textAlign="center" >
              <Text fontSize="lg" fontWeight="500">
                {userDashboardData.userData.projectsCount}
              </Text>
              <Text fontSize="sm">Proyectos</Text>
            </Box>
            <Box display="grid" ml="20px" mr="40px" mt="10px" textAlign="center">
              <Text fontSize="lg" fontWeight="500">
                {userDashboardData.userData.earnings}
              </Text>
              <Text fontSize="sm">Ganancias</Text>
            </Box>
          </Box>
          <Link href="/admin/gananciasUser">
          <Button colorScheme="purple"
            mt={8}
            ml="50px"
            mr="40px"
            fontSize="sm"
            fontWeight="500"
            variant="solid"
            >
              Ver Ganancias
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
