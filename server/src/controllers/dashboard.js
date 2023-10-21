const Services = require('../services').dashboardServices

const dashBoardController = {
    getUserDashboard: async function (req,res) {
        try {
            const { id } = req.params
            const data = await Services.Dashboard(parseInt(id))
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = dashBoardController