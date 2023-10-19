import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Textarea,
  Button,
  Tooltip,
  Grid,
  Heading,
  HStack,
  Input,
  Avatar,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  FiTag,
  FiCalendar,
  FiMessageSquare,
  FiCornerUpLeft,
  FiUser,
  FiMail,
} from "react-icons/fi";
import LayoutUser from "../../components/layout/layoutUser";

const ProjectDetail = () => {
  const project = {
    image: "https://reactjsexample.com/content/images/2020/06/poco.jpg", // URL de la imagen del proyecto
    title: "Skote Dashboard UI",
    description:
      "La existencia separada es un mito. Para la ciencia, la música, el deporte, etc.",
    projectDetails: `
      Para una persona que habla inglés, parecerá como un inglés simplificado, como me dijo un amigo escéptico de Cambridge lo que es Occidental. Las lenguas europeas son miembros de la misma familia. Su existencia separada es un mito. Para la ciencia, la música, el deporte, etc.
      Para lograr esto, sería necesario. La existencia separada es un mito. Si varias lenguas se fusionan.
    `,

    startDate: "08 Sept, 2019",
    dueDate: "12 Oct, 2019",
    comments: [
      {
        username: "Delores Williams",
        timestamp: "1 hr Ago",
        comment_text:
          "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.",
      },
      {
        username: "Clarence Smith",
        timestamp: "2 hrs Ago",
        comment_text:
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      },
      {
        username: "Silvia Martinez",
        timestamp: "2 hrs Ago",
        comment_text:
          "To take a trivial example, which of us ever undertakes laborious physical exercise.",
      },
      {
        username: "Keith McCoy",
        timestamp: "12 Aug",
        comment_text:
          "Donec posuere vulputate arcu. phasellus accumsan cursus velit.",
      },
    ],
  };

  // const [newComment, setNewComment] = useState("");
  // const [comments, setComments] = useState(project.comments);

  // const handleCommentSubmit = () => {
  //   if (newComment) {
  //     const newCommentObject = {
  //       username: "Your Name",
  //       timestamp: "Just Now",
  //       comment_text: newComment,
  //     };
  //     setComments([...comments, newCommentObject]);
  //     setNewComment("");
  //   }
  // };
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(project.comments);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleCommentSubmit = () => {
    if (newComment) {
      const newCommentObject = {
        username: "Your Name",
        timestamp: "Just Now",
        comment_text: newComment,
      };

      if (replyingTo !== null) {
        newCommentObject.inReplyTo = replyingTo;
      }

      setComments([...comments, newCommentObject]);
      setNewComment("");
      setReplyingTo(null); // Limpiar la respuesta
    }
  };

  return (
    <LayoutUser>
      <Grid mt="4" justifyItems="center">
        <Flex justifyContent="center">
          <Tooltip>
            <Flex
              alignItems="center"
              bg="gray.200" // Fondo gris para resaltar el icono y el texto
              p="2" // Espaciado dentro del elemento
              borderRadius="md" // Bordes redondeados
              mx="2"
              cursor="pointer"
              _hover={{
                // Estilo al pasar el mouse
                bg: "gray.300", // Cambia el color de fondo al pasar el mouse
              }}
            >
              <FiTag size={16} /> {/* Tamaño del ícono */}
              <Box ml="2">Proyecto</Box>
            </Flex>
          </Tooltip>
        </Flex>
        <Grid justifyItems="center" mt="4">
          <Heading mb="2" ml="12">
            {project.title}
          </Heading>
          <Flex justify="center" alignItems="center">
            <FiCalendar />
            <Text m="2">{project.startDate}</Text>
          </Flex>
          <HStack spacing="10em" mt="8">
            <Grid justifyItems="center">
              <Text fontSize="md">Categoria</Text>
              <Text fontSize="xl" fontWeight="semibold">
                Proyectos
              </Text>
            </Grid>
            <Grid justifyItems="center">
              <Text fontSize="md">Fecha</Text>
              <Text fontSize="xl" fontWeight="semibold">
                {project.startDate}
              </Text>
            </Grid>
            <Grid justifyItems="center">
              <Text fontSize="md">Posteado por</Text>
              <Text fontSize="xl" fontWeight="semibold">
                Francisco
              </Text>
            </Grid>
          </HStack>
          <Image
            src={project.image}
            alt="Logo del proyecto"
            boxSize="md"
            objectFit="contain"
          />
          <Grid justifyItems="center" pl={4}>
            <Text as="h1" fontWeight="semibold" mb="4">
              Detalles del proyecto
            </Text>
            <Text fontSize="lg">"{project.description}"</Text>
          </Grid>
        </Grid>
        <Grid className="details" p={4}>
          <Text>{project.projectDetails}</Text>
          <HStack spacing="10em" justify="center">
            <Grid m={4} justifyItems="center">
              <Text as="h3" fontSize="lg" fontWeight="semibold">
                Fecha de inicio
              </Text>
              <Text>{project.startDate}</Text>
            </Grid>
            <Grid m={4} justifyItems="center">
              <Text as="h3" fontSize="lg" fontWeight="semibold">
                Fecha de vencimiento
              </Text>
              <Text>{project.dueDate}</Text>
            </Grid>
          </HStack>
        </Grid>
        <Flex className="comments" flexDirection="column">
          <Flex>
            <Flex alignItems="center" mb="4">
              <FiMessageSquare size={16} />
              <Text as="h3" fontSize="lg" fontWeight="semibold" ml="2">
                Comentarios:
              </Text>
            </Flex>
          </Flex>
          {project.comments.map((comment, index) => (
            <Box
              key={index}
              py={3}
              borderTop={index !== 0 ? "1px solid #e2e8f0" : ""}
            >
              <Flex alignItems="center">
                <Avatar
                  size="sm"
                  src="assets/images/users/avatar-1.jpg"
                  mr={3}
                />
                <Flex direction="column">
                  <Flex alignItems="center">
                    <Text fontSize="sm" fontWeight="semibold">
                      {comment.username}
                    </Text>
                    <Text fontSize="xs" color="gray.500" className="ml-auto">
                      {comment.timestamp}
                    </Text>
                  </Flex>
                  <Text fontSize="md" color="gray.700">
                    {comment.comment_text}
                  </Text>
                  <Flex color="green.600">
                    <FiCornerUpLeft />
                    <Button
                      onClick={() => setReplyingTo(index)}
                      size="sm"
                      variant="link"
                      colorScheme="green"
                    >
                      Reply
                    </Button>
                  </Flex>
                  {replyingTo === index && (
                    <Textarea
                      placeholder="Your reply"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      mb={2}
                    />
                  )}
                  {replyingTo === index && (
                    <Button
                      onClick={handleCommentSubmit}
                      width="100px"
                      colorScheme="purple"
                      className="ml-auto"
                    >
                      Add Reply
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Box>
          ))}

          <Box mt="6" mb="4">
            <Text as="h5" fontSize="lg" mb="3">
              Deja un Mensaje
            </Text>
            <form>
              <Flex>

              <FormControl id="commentname-input" mb="3" mr="4">
                <FormLabel htmlFor="commentname-input">Nombre</FormLabel>
                <Input type="text" placeholder="Ingresa tu nombre" borderColor="gray.300" />
              </FormControl>
              <FormControl id="commentemail-input" mb="3">
                <FormLabel htmlFor="commentemail-input">
                  Correo Electrónico
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  borderColor="gray.300"
                />
              </FormControl>
              </Flex>
              <FormControl id="commentmessage-input" mb="3">
                <FormLabel htmlFor="commentmessage-input">Mensaje</FormLabel>
                <Textarea placeholder="Tu mensaje..." rows="3" borderColor="gray.300"/>
              </FormControl>
              <Box textAlign="right" mb="4">

              <Button type="submit" colorScheme="orange">
                Enviar
              </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Grid>
    </LayoutUser>
  );
};
export default ProjectDetail;
