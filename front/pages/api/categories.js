export default function handler(req, res) {
  res.status(200).json({
    data: [
      { id: 1, name: "Temas" },
      { id: 2, name: "Herramientas" },
      { id: 3, name: "Librerias" },
      { id: 4, name: "Plugins" },
    ],
  });
}

[
  {
    name: "Projecto 15",
    description: "Descripción larga de un proyecto de prueba",
    price: 2.35,
    visibility: true,
    shortDescription: "proyecto de prueba",
    image:
      "https://images.unsplash.com/photo-1688716290056-c727b0983742?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=210&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NjM0NDA3Nw&ixlib=rb-4.0.3&q=80&w=350",
    commentsAllowed: true,
    status: "Prototype",
    category: 1,
    tags: ["1", "2"],
  },
];
