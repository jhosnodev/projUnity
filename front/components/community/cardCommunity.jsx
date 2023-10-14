import { Box, Flex, Text, Image, Button, Avatar, IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";

const pedidosDeUsuarios = [
  {
    "image": "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    "title": "Nuevo Diseño de Dashboard",
    "description": "Requiere rediseñar el panel de control de la aplicación.",
    "tags": ["UI", "Diseño", "Dashboard"],
    "username": "Usuario123",
    "publishedAgo": "Hace 2 días"
  },
  {
    "image": "https://www.micazook.com/img/ico/ico_UIUXDesign.png",
    "title": "App Landing UI",
    "description": "Necesita una página de aterrizaje atractiva para una aplicación.",
    "tags": ["UI", "Diseño", "App"],
    "username": "Usuario456",
    "publishedAgo": "Hace 5 días"
  },
  {
    "image": "data:image/png;base64,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",
    "title": "Página web para restaurante",
    "description": "Se requiere un sitio web para un restaurante local.",
    "tags": ["Web", "Restaurante", "Diseño"],
    "username": "Usuario789",
    "publishedAgo": "Hace 1 semana"
  }
  // ...otros objetos de pedidosDeUsuarios
];

const MyCard = () => {
  return (
    <div>
      {pedidosDeUsuarios.map((pedido, index) => (
        <Box
          key={index}
          boxShadow="lg"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.300"
          minW="500px"
          bg="white"
          mb={6}
          p={4}
          rounded="md"
        >
          <Flex justifyContent="space-between" bg="gray.100" p={2} rounded="md">
            <Flex alignItems="center">
              <Avatar size="sm" src="user-avatar.jpg" mr={2} />
              <Text fontWeight="bold" mr={4}>{pedido.username}</Text>
              <Text fontSize="sm" color="gray.500">{pedido.publishedAgo}</Text>
            </Flex>
            <Box className="like-button">
              <IconButton
                isRound={true}
                variant='solid'
                colorScheme='red'
                aria-label='Like'
                fontSize='20px'
                icon={<FiHeart strokeWidth='3px' color="white" />}
              />
            </Box>
          </Flex>
          <Flex className="project-info" p={4}>
            <Image src={pedido.image} alt="Logo del proyecto" boxSize="100px" />
            <Box className="description" pl={4}>
              <Text as="h2" fontSize="xl" fontWeight="semibold">{pedido.title}</Text>
              <Text fontSize="md">{pedido.description}</Text>
            </Box>
          </Flex>
          <Flex className="actions" p={2} justifyContent="flex-end">
            <Button variant="outline" colorScheme="purple" mr={2}>Ver más</Button>
            <Button variant="solid" colorScheme="purple">Contactar</Button>
          </Flex>
          <Flex className="tags" p={2} flexWrap="wrap">
            {pedido.tags.map((tag, tagIndex) => (
              <Text key={tagIndex} className="tag" mr={2} mb={2} p={2} bg="gray.200" rounded="md">
                #{tag}
              </Text>
            ))}
          </Flex>
        </Box>
      ))}
    </div>
  );
};

export default MyCard;
