import { Box, Image, Text } from "@chakra-ui/react";

export default function MetricCard({ title, value, icon }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="90%"
      height="70%"
      bg="white"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      rounded="lg"
      m="4"
      p="4"
      justifyContent="space-between"
    >
      <Box display="grid">
        <Text fontSize="md">{title}</Text>
        <Text fontSize="lg" fontWeight="500">
          {value}
        </Text>
      </Box>
      <Box width="50px"
      height="50px"
      bg="purple.500" // Color de fondo
      borderRadius="full" // Para hacerlo circular
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white" // Color del icono
      fontSize="24px">
        {icon}
      </Box>
    </Box>
  );
}

{
  /* <Box>
              <Box
                display="flex"
                flexWrap="wrap"
                width="180px"
                height="80px"
                bg="white"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              >
                <Box display="grid">
                  <Text fontSize="md">Ventas</Text>
                  <Text fontSize="lg" fontWeight="500">
                    {summaryData.totalSales}
                  </Text>
                </Box>
                <Box>
                  <Image
                    src="https://images.vexels.com/media/users/3/147974/isolated/lists/22ed2b8524101426e7b490c95097a8f2-icono-de-ventas-comerciales.png"
                    borderRadius="full"
                    boxSize="50px"
                  ></Image>
                </Box>

                <Box diplay="grid">
                  <Text fontSize="md">Ganancias</Text>
                  <Text fontSize="lg" fontWeight="500">
                    {userData[0].earnings}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                  width="200px"
                  height="80px"
                  bg="white"
                  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                >
                  <Box diplay="grid">
                    <Text fontSize="md">Suscripciones Activas</Text>
                    <Text fontSize="lg" fontWeight="500">
                      {summaryData.activeSubscriptions}
                    </Text>
                  </Box>
                  <Box>
                    <Image
                      src="https://images.vexels.com/media/users/3/147974/isolated/lists/22ed2b8524101426e7b490c95097a8f2-icono-de-ventas-comerciales.png"
                      borderRadius="full"
                      boxSize="50px"
                    ></Image>
                  </Box>
                </Box>
              </Box> */
}
