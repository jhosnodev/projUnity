import { Box, Flex, Text, Image, Button, Avatar, IconButton, Link } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import ContactModal from "./contactarUser";

const pedidosDeUsuarios = [
  {
    "image": "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    "title": "Nuevo Diseño de Dashboard",
    "description": "Requiere rediseñar el panel de control de la aplicación.",
    "tags": ["UI", "Diseño", "Dashboard"],
    "username": "Usuario123",
    "publishedAgo": "Hace 2 días",
    "comments": "Great project! I love the design and concept.",
  },
  {
    "image": "https://www.micazook.com/img/ico/ico_UIUXDesign.png",
    "title": "App Landing UI",
    "description": "Necesita una página de aterrizaje atractiva para una aplicación.",
    "tags": ["UI", "Diseño", "App"],
    "username": "Usuario456",
    "publishedAgo": "Hace 5 días",
    "comments": "This is really impressive. Keep up the good work!.",
  },
  {
    "image": "",
    "title": "Página web para restaurante",
    "description": "Se requiere un sitio web para un restaurante local.",
    "tags": ["Web", "Restaurante", "Diseño"],
    "username": "Usuario789",
    "publishedAgo": "Hace 1 semana",
    "comments": "I'm looking forward to seeing the progress on this project.",
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
            <Link href="/community/detalle">
            <Button variant="outline" colorScheme="purple" mr={2} project={pedidosDeUsuarios}>Ver más</Button>
            </Link>
            
          <ContactModal />
       
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
