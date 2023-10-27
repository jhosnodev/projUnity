const Services = require('../services').dashboardServices

const dashBoardController = {
    getUserDashboard: async function (req,res) {
        try {
            const { id } = req.params
            const { ventas, desde, hasta } = req.query
            
            const currentTime = new Date()

            let fechaDesde = desde? desde.split('-') : [];
            fechaDesde.length !== 3?         
                fechaDesde = new Date(currentTime.getFullYear(),currentTime.getMonth(),1,0,0,0)
                : fechaDesde = new Date(parseInt(desde[0]),parseInt(desde[1])-1,parseInt(desde[2]),0,0,0); //<<--- si no esta definida la fecha desde, se define por defecto desde el primero del corriente mes
            
            let fechaHasta = hasta? hasta.split('-') : [];
            fechaHasta.length !== 3? 
                fechaHasta = currentTime
                : fechaHasta = new Date(parseInt(hasta[0]),parseInt(hasta[1])-1,parseInt(hasta[2]),0,0,0);
            let data;
            if (ventas) {
                data = await Services.userSalesDetail(parseInt(id), fechaDesde, fechaHasta) 
            } else {
                data = await Services.Dashboard(parseInt(id), fechaDesde);
            }
            if (data) {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
}

module.exports = dashBoardController
