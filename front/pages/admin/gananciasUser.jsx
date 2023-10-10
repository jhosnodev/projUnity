import React from "react";
import { Box, Text, Button, Heading, Divider } from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";

export default function GananciasView() {
  return (
    <HeadFooter>
      <Box
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
        borderRadius="0.25rem"
        borderWidth="0"
        borderColor="#f6f6f6"
        minW="500px"
        h="var(--bs-card-height)"
        bg="#fff"
      >
        <Box p="4" bg="customLightPurple" fontWeight="600">
          <Heading as="h2" size="lg">
            Detalles de las ganancias del Usuario del Mes
          </Heading>
        </Box>
        <Divider />
        <Box p="4">
          <Text fontSize="lg" fontWeight="500">
            Total de Ganancias: $5,000
          </Text>
          <Text fontSize="md" mt="2">
            Aquí puedes encontrar información detallada sobre sus ganancias.
          </Text>
          {/* Agrega más información de ganancias aquí */}
        </Box>
        <Button
          mt="4"
          colorScheme="orange"
          width="60%"
          borderRadius="lg"
          size="md"
          ml="50px"
        >
          Volver al Perfil
        </Button>
      </Box>
    </HeadFooter>
  );
}
