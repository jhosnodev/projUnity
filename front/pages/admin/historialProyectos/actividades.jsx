import { useRouter } from "next/router";
import HeadFooter from "../../../components/admin/HeadAndFooter";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const activitiesData = [
  {
    id: 1,
    projectId: 1,
    name: "Proyecto A",
    description: "Actividad 1 del Proyecto A",
    date: "2023-10-05",
  },
  {
    id: 2,
    projectId: 2,
    name: "Proyecto B",
    description: "Actividad 1 del Proyecto B",
    date: "2023-09-20",
  },
  {
    id: 3,
    projectId: 2,
    name: "Proyecto B",
    description: "Actividad 2 del Proyecto B",
    date: "2023-09-28",
  },
  {
    id: 4,
    projectId: 1,
    name: "Proyecto A",
    description: "Actividad 2 del Proyecto A",
    date: "2023-09-30",
  },
  {
    id: 5,
    projectId: 3,
    name: "Proyecto C",
    description: "Actividad 1 del Proyecto C",
    date: "2023-10-20",
  },
  {
    id: 6,
    projectId: 4,
    name: "Proyecto D",
    description: "Actividad 1 del Proyecto D",
    date: "2023-09-20",
  },
  // Agrega más actividades aquí
];

const getProjectName = (projectId) => {
  const project = activitiesData.find((activity) => activity.projectId === parseInt(projectId));
  return project ? project.name : "Proyecto Desconocido";
};

const Activities = () => {
  const router = useRouter();
  const { id } = router.query;
  const projectName = getProjectName(id);

  const filteredActivities = activitiesData.filter((activity) => activity.projectId === parseInt(id));

  return (
    <HeadFooter>
      <Box m="6">
        <Heading as="h2" size="lg" mb="4">
          Actividades del {projectName}
        </Heading>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Actividad ID</Th>
              <Th>Descripción</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredActivities.map((activity) => (
              <Tr key={activity.id}>
                <Td>{activity.id}</Td>
                <Td>{activity.description}</Td>
                <Td>{activity.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
};

export default Activities;