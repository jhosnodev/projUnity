const Services = require("../services").RequestsServices;
const { Requests } = require("../models"); // Importa el modelo de Requests

const requestsController = {
  createRequest: async function (req, res) {
    try {
      const newRequest = await Requests.create(req.body);
      res.status(201).json(newRequest); // Devuelve un código de estado 201 para indicar que se creó con éxito.
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la solicitud' });
    }
  },

  getAllRequests: async function (req, res) {
    try {
      const requests = await Requests.findAll();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
  },

  putRequests: async function (req, res) {
    try {
      const requestsId = req.params.id;
      const requestsData = req.body;

      const updatedRequest = await Services.updateRequest(
        requestsId,
        requestsData
      );

      if (updatedRequest) {
        res.status(200).json(updatedRequest);
      } else {
        res.status(404).json({ error: 'Solicitud no encontrada' });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteRequest: async function (req, res) {
    try {
      const requestsId = req.params.id;

      const result = await Services.deleteRequest(requestsId);

      if (result) {
        res.status(200).json({ message: 'Solicitud eliminada con éxito' });
      } else {
        res.status(404).json({ error: 'Solicitud no encontrada' });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = requestsController;