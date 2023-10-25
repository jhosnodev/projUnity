import { Box, Text, HStack } from "@chakra-ui/react";

export default function MetricCard({ title, value, icon }) {
  return (
    <HStack
      display="flex"
      flexDirection="row"
      alignItems="center"
      bg="white"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      rounded="lg"
      p="6"
      spacing={4}
    >
      <Box display="grid" textAlign="center">
        <Text fontSize="sm">{title}</Text>
        <Text fontSize="lg" fontWeight="500">
          {value}
        </Text>
      </Box>
      <Box
        width="60px"
        height="60px"
        bg="customBlue" // Color de fondo
        borderRadius="full" // Para hacerlo circular
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white" // Color del icono
        fontSize="24px"
      >
        {icon}
      </Box>
    </HStack>
  );
}
