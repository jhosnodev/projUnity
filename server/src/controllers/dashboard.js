const Services = require('../services').dashboardServices

const dashBoardController = {
    getUserDashboard: async function (req,res) {
        try {
            const { id } = req.params
            const { fecha } = req.query
            let date = fecha? fecha.split('-') : []
            if (date.length !== 3) {
                const currentTime = new Date()
                date = new Date(currentTime.getFullYear(),currentTime.getMonth(),1,0,0,0) //<<--- si no esta definida la fecha desde, se define por defecto desde el primero del corriente mes
            } else {
                date = new Date(date[0],date[1]-1,date[2],0,0,0)
            }
            const data = await Services.Dashboard(parseInt(id), date)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = dashBoardController