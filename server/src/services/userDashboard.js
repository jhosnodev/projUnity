const {Users, UserTypes, Projects, Payments, Ratings, ProjectUser} = require('../db');
const {Op, Sequelize} = require('sequelize');
const {format, addDays} = require('date-fns')

const DashboardService = {
    Dashboard: async function (id, fecha) {
        try {
            const findRole = await Users.findByPk(id)
            if (findRole.role === 'admin') {
                return {
                    ...await this.adminDashboard(fecha),
                    myData:  await this.userDashboard(id, fecha)
                }
            } else {
                return await this.userDashboard(id, fecha)
            }
        } catch (error) {
            return error
        }
    },
    adminDashboard: async function (fecha) {
        try {
            const totalProjects = await this.totalProjects();
            const totalUsers = await Users.findAll({where: {deletedAt: null}});
            const sales = await this.userSales(null,fecha);
            const devoluciones = await this.userDevolutions(null,fecha);
            const donaciones = await this.userDonations(null,fecha);
            const {count, rows } = await Projects.findAndCountAll({where: {deletedAt: null}, raw: true})
            const Months = [
                new Date(fecha.getFullYear(),fecha.getMonth()-2,fecha.getDate(),0,0,0),
                new Date(fecha.getFullYear(),fecha.getMonth()-1,fecha.getDate(),0,0,0),
                new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate(),0,0,0)
            ]
            const salesMonths = [
                {
                    sales: await this.userSales(null,Months[0]),
                    devolutions: await this.userDevolutions(null,Months[0])
                },
                {
                    sales: await this.userSales(null,Months[1]),
                    devolutions: await this.userDevolutions(null,Months[1])
                },
                {
                    sales: await this.userSales(null,Months[2]),
                    devolutions: await this.userDevolutions(null,Months[2])
                }
            ]
            let topProjectsData = await this.salesPerProjects(null,fecha)
            topProjectsData = topProjectsData.slice(0,3)
            topProjectsData = [
                {
                    project: await Projects.findOne({where: {id: topProjectsData[0].product}, attributes: ['name'], raw: true}),
                    ventas: topProjectsData[0].Count
                },
                {
                    project: await Projects.findOne({where: {id: topProjectsData[1].product}, attributes: ['name'], raw: true}),
                    ventas: topProjectsData[1].Count
                },
                {
                    project: await Projects.findOne({where: {id: topProjectsData[2].product}, attributes: ['name'], raw: true}),
                    ventas: topProjectsData[2].Count}
            ]
            let topRankedProjectsData = await this.topRankedProject()
            let topRankProject = topRankedProjectsData.slice(0,3)

            //const {id,name,email,image,active,twitterUser,githubUser,linkedinUser,role,Sales} = await this.userOfTheMonth(fecha);
            return { 
                summaryData: {
                    totalProjects: totalProjects.count,
                    totalUsers: totalUsers.length,
                    activeSubscriptions: 75,
                    totalSales: sales.contador - devoluciones.contador,
                    totalRevenue: `$${(sales.valorizado - devoluciones.valorizado + donaciones.valorizado).toFixed(2)}`,
                    averageSalesPerUser: `$${await this.averageSales(null,fecha)}`,
                    activeProjects: count,
                    averageDailyUsage: "2 horas",
                    monthlyRecurringRevenue: "$5,000",
                },
                userData: await this.userOfTheMonth(fecha),
                salesData: [
                    {   month: format(Months[0], 'MMMM'),
                        ventas: (salesMonths[0].sales.valorizado-salesMonths[0].devolutions.valorizado).toFixed(2)
                    },
                    {   month: format(Months[1], 'MMMM'),
                        ventas: (salesMonths[1].sales.valorizado-salesMonths[1].devolutions.valorizado).toFixed(2)
                    },
                    {   month: format(Months[2], 'MMMM'),
                        ventas: (salesMonths[2].sales.valorizado-salesMonths[2].devolutions.valorizado).toFixed(2)
                    }
                ],
                topProjectsData: [
                    {
                        project: topProjectsData[0].project.name,
                        ventas: topProjectsData[0].ventas,
                    },
                    {
                        project: topProjectsData[1].project.name,
                        ventas: topProjectsData[1].ventas,
                    },
                    {
                        project: topProjectsData[2].project.name,
                        ventas: topProjectsData[2].ventas,
                    },
                ],
                topRankedProjectsData: [
                    { 
                        project: topRankProject[0].name,
                        ranking: topRankProject[0].averageScore.toFixed(2)
                    },
                    { 
                        project: topRankProject[1].name,
                        ranking: topRankProject[1].averageScore.toFixed(2)
                    },
                    { 
                        project: topRankProject[2].name, 
                        ranking: topRankProject[2].averageScore.toFixed(2)
                    },
                ],
                topSellingUsers: await this.topRankedSales()
                
            }
        } catch (error) {
            return error
        }
    },
    userDashboard: async function (id, fecha) {
        try {
            const totalProjects = await this.totalProjects(id,fecha);
            const totalUsers = await Users.findAll({where: {deletedAt: null}});
            const sales = await this.userSales(id,fecha);
            const devoluciones = await this.userDevolutions(id,fecha);
            const donaciones = await this.userDonations(id,fecha);
            const {count, rows } = await Projects.findAndCountAll({where: {deletedAt: null}, raw: true})
            return {
                totalProjects: totalProjects.count,
                activeSubscriptions: 75,
                totalSales: sales.contador - devoluciones.contador,
                totalRevenue: `$${sales.valorizado - devoluciones.valorizado + donaciones.valorizado}`,
                averageSalesPerUser: await this.averageSales(id,fecha),
                activeProjects: count,
                averageDailyUsage: "2 horas",
                monthlyRecurringRevenue: "$5,000",
            }
        } catch (error) {
            return error
        }
    },
    userSales: async function (userId,fecha) {
        try {
            let sales = []
            const products = await this.totalProjects(userId);
            for (let i = 0; i < products.rows.length;i++) {
                const subTotal = await this.salesPerProjects(products.rows[i].id, fecha)
                subTotal[0]? sales.push(subTotal[0]) : null;
            }
            return {
                valorizado: sales.reduce((total,monto) => total + parseFloat(monto.totalSales), 0),
                contador: sales.reduce((total,contador) => total + parseInt(contador.Count), 0)
            }
        } catch (error) {
            return error
        }
    },
    userSalesDetail: async function (userId,desde,hasta) {
        try {
            const ProjectsIds = await Projects.findAll({
                include: { model: Users, where: {id: userId}, attributes: [] },
                attributes: ['id']});
            let userProducts = []
            for (let i in ProjectsIds) { userProducts.push(ProjectsIds[i].id)}
            let dates = []
            //const hasta = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+30,0,0,0)
            while (desde <= hasta) {
                dates.push(desde)
                desde = addDays(desde,1)
            }
            let ventas = []
            for (let i in dates) {
                const data = await Payments.findAll({
                    where: {
                        product: userProducts,
                        createdAt: dates[i],
                        status: 'completed',
                        concept: 'venta'
                    },
                    attributes: [
                        ['createdAt', 'fecha'],
                        [Sequelize.fn('count',Sequelize.col('product')),'proyectosVendidos'],
                        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'ganancias']
                    ],
                    group: ['fecha'],
                    raw: true
                });
                data.length !== 0? 
                    ventas.push({...data[0], fecha: format(data[0].fecha, 'yyyy-MM-dd')}) 
                    : ventas.push({fecha: format(dates[i], 'yyyy-MM-dd'), proyectosVendidos: 0, ganancias: 0});
            }
            return ventas
        } catch (error) {
            return error
        }
    },
    userDonations: async function (userId,fecha) {
        try {
            let donations = []
            const products = await this.totalProjects(userId);
            for (let i = 0; i < products.rows.length;i++) {
                const subTotal = await this.donationsPerProjects(products.rows[i].id,fecha)
                subTotal[0]? donations.push(subTotal[0]) : 0
            }
            return {
                valorizado: donations.reduce((total,monto) => total + parseFloat(monto.totalDonations), 0),
                contador: donations.reduce((total,contador) => total + parseInt(contador.Count), 0)
            }
        } catch (error) {
            return error
        }
    },
    userDevolutions: async function (userId,fecha) {
        try {
            let devolutions = []
            const products = await this.totalProjects(userId);
            for (let i = 0; i < products.rows.length;i++) {
                const subTotal = await this.devolutionsPerProjects(products.rows[i].id, fecha)
                subTotal[0]? devolutions.push(subTotal[0]) : 0
            }
            return {
                valorizado: devolutions.reduce((total,monto) => total + parseFloat(monto.totalDevolutions), 0),
                contador: devolutions.reduce((total,contador) => total + parseInt(contador.Count), 0)
            }
        } catch (error) {
            return error
        }
    },
    averageSales: async function (id,fecha) {
        try {
            const {count, rows} = await Users.findAndCountAll({where: {id: id? id : {[Op.gt]: 0}}, raw: true})
            const ventas = await this.userSales(id, fecha)
            const devoluciones = await this.userDevolutions(id, fecha)
            const average = (ventas.valorizado - devoluciones.valorizado) / count
            return average.toFixed(2)
        } catch (error) {
            return error
        }
    },
    totalProjects: async function (id) {
        try {
            const {count, rows} = await Projects.findAndCountAll({
                include: {
                    model: Users,
                    where: {id: id? id : {[Op.gt]: 0}},
                    attributes: ['id','name','image'],
                    trough: {attributes: []},
                },
                attributes: ['id','name','price'],
                raw: true
            })
            return {count, rows}
        } catch (error) {
            return error
        }
    },
    userOfTheMonth: async function (fecha) {
        try {
            const users = await Users.findAll({
                where: {deletedAt: null},
                attributes: {exclude: ['password','createdAt','updatedAt','deletedAt']},
                raw: true
            })
            let salesPerUser = []
            let ventas = []
            for (let i in users) {
                const sales = await this.userSales(users[i].id, fecha)
                salesPerUser.push({...users[i], Sales: sales})
                ventas.push(sales.valorizado)
            }
            ventas.sort((a,b) => b - a)
            const bestSales = ventas.shift()
            const bestUser = salesPerUser.filter(x => x.Sales.valorizado === bestSales)[0];
            const projects = await this.totalProjects(bestUser.id,fecha)

            const {id,name,email,image,active,twitterUser,githubUser,linkedinUser, role, Sales} = bestUser
            
            return {
                id,
                name,
                email,
                image,
                role,
                status: active? 'Activo' : 'Inactivo',
                bio: {twitterUser,githubUser,linkedinUser},
                projectsCount: projects.count,
                earnings: `$${Sales.valorizado}`,
            }
        } catch (error) {
            return error
        }
    },
    salesPerProjects: async function (id, fecha) {
        try {
            const hasta = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+30,0,0,0)
            const salesPerProjects = await Payments.findAll({
                attributes: [
                    'product',
                    [Sequelize.fn('sum',Sequelize.col('paymentAmount')), 'totalSales'],
                    [Sequelize.fn('count',Sequelize.col('paymentAmount')), 'Count']
                ],
                group: ['product'],
                where: {
                    product: id? id : {[Op.gt]: 0},
                    concept: 'venta',
                    status: 'completed',
                    createdAt: {
                        [Op.between]: [fecha, hasta]
                    }
                },
                raw: true,
            });
            return salesPerProjects.sort((a,b) => b.Count - a.Count)
        } catch (error) {
            return error
        }
    },
    donationsPerProjects: async function (id, fecha) {
        try {
            const hasta = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+30,0,0,0)
            const donations = await Payments.findAll({
                attributes: [
                    'product',
                    [Sequelize.fn('sum',Sequelize.col('paymentAmount')), 'totalDonations'],
                    [Sequelize.fn('count',Sequelize.col('paymentAmount')), 'Count']
                ],
                group: ['product'],
                where: {
                    product: id? id : {[Op.gt]: 0},
                    concept: 'donacion',
                    status: 'completed',
                    createdAt: {
                        [Op.between]: [fecha, hasta]
                    }
                },
                raw: true,
            });
            return donations
        } catch (error) {
            return error
        }
    },
    devolutionsPerProjects: async function (id, fecha) {
        try {
            const hasta = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+30,0,0,0)
            const devolutions = await Payments.findAll({
                attributes: [
                    'product',
                    [Sequelize.fn('sum',Sequelize.col('paymentAmount')), 'totalDevolutions'],
                    [Sequelize.fn('count',Sequelize.col('paymentAmount')), 'Count']
                ],
                group: ['product'],
                where: {
                    product: id? id : {[Op.gt]: 0},
                    concept: 'devolucion',
                    status: 'completed',
                    createdAt: {
                        [Op.between]: [fecha, hasta]
                    }
                },
                raw: true,
            });
            return devolutions
        } catch (error) {
            console.log(error)
            return error
        }
    },
    salesPerMonth: async function (fecha) {
        try {
            const hasta = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+30,0,0,0)
            console.log(fecha)
            console.log(hasta)
            const data = await Payments.findAll({
                attributes: [
                    'product',
                    [Sequelize.fn('sum',Sequelize.col('paymentAmount')), 'totalDevolutions'],
                    [Sequelize.fn('count',Sequelize.col('paymentAmount')), 'Count']
                ],
                //group: ['product'],
                where: {
                    createdAt: {[Op.between]: [fecha, hasta]},
                    status: 'completed'    
                }
            })
            return data
        } catch (error) {
            return error
        }
    },
    topRankedProject: async function () {
        try {
            const data = await Ratings.findAll({
                include: {
                    model: Projects,
                    attributes: ['name'],
                    through: {attributes: []}
                },
                attributes: [
                    'Projects.name',
                    [Sequelize.fn('sum',Sequelize.col('score')), 'totalScore']
                ],
                group: ['Projects.name'],
                raw: true
            })
            const datacount = await Ratings.findAll({
                include: {
                    model: Projects,
                    attributes: ['name'],
                    through: {attributes: []}
                },
                attributes: [
                    'Projects.name',
                    [Sequelize.fn('count',Sequelize.col('score')), 'totalCount']
                ],
                group: ['Projects.name'],
                raw: true
            })
            let ScoreSum = data.sort((a,b) => b.totalScore - a.totalScore)
            let scoreCount = datacount.sort((a,b) => b.totalCount - a.totalCount)
            let datafinal = []
            for (const i in ScoreSum) {
                for (const e in scoreCount) {
                    if (scoreCount[e].name === ScoreSum[i].name) {
                        datafinal = [
                            ...datafinal, {
                                name: scoreCount[e].name,
                                averageScore: ScoreSum[i].totalScore /scoreCount[e].totalCount
                            }
                        ]
                    }
                }
            }

            return datafinal.sort((a,b) => b.averageScore - a.averageScore)
        } catch (error) {
            return error
        }
    },
    topRankedSales: async function () {
        try {
            let userSales = []
            const currentDate = new Date()
            let fecha = new Date(currentDate.getFullYear(),currentDate.getMonth(),1,0,0,0)
            const User = await Users.findAll({where: {active: true}, attributes: ['id','name']})
            for (let i in User) {
                let sales = await this.userSales(User[i].id,fecha)
                userSales = [
                    ...userSales,
                    {
                        user: User[i].name,
                        ventas: sales.valorizado
                    }
                ]
            }
            userSales.sort((a,b) => b.ventas - a.ventas)
            return userSales.slice(0,3)
        } catch (error) {
            return error
        }
    }
}

module.exports = DashboardService
