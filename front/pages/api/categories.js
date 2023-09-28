export default function handler(req, res) {
  res.status(200).json({data: [
    { id: 1, name: "Temas" },
    { id: 2, name: "Herramientas" },
    { id: 3, name: "Librerías" },
    { id: 4, name: "Pluggins" },
  ]});
}
