const {Users, UserTypes, Projects, Payments} = require('../db');
const {Op, Sequelize} = require('sequelize');

const DashboardService = {
    Dashboard: async function (id) {
        try {
            const role = await Users.findByPk(id)
            if (role.role === 'admin') {
                return this.adminDashboard(id)
            } else {
                return this.userDashboard(id)
            }
        } catch (error) {
            return error
        }
    },
    adminDashboard: async function () {
        try {
            const totalProjects = await Projects.findAll();
            const totalUsers = await Users.findAll({where: {deletedAt: null}});

            return {
                totalProjects: await Projects.findAll().length,
                totalUsers: totalUsers.length,
                activeSubscriptions: 75,
                totalSales: {
                    ventas: await this.userSales(),
                    donaciones: await this.userDonations(),
                    devoluciones: await this.userDevolutions()
                },
                totalRevenue: "$10,000",
                averageSalesPerUser: this.averageSales(),
                activeProjects: 30,
                averageDailyUsage: "2 horas",
                monthlyRecurringRevenue: "$5,000",
            }
        } catch (error) {
            return error
        }
    },
    userDashboard: async function (id) {
        try {
            const totalProjects = await Projects.findAll({
                include: {
                    model: Users,
                    where: {id: id}
                },
                raw: true})
            
            return {
                totalProjects: totalProjects.length,
                activeSubscriptions: 75,
                totalSales: {
                    ventas: await this.userSales(id),
                    donaciones: await this.userDonations(id),
                    devoluciones: await this.userDevolutions(id)
                },
                totalRevenue: "$10,000",
                averageSalesPerUser: await this.averageSales(id),
                activeProjects: 30,
                averageDailyUsage: "2 horas",
                monthlyRecurringRevenue: "$5,000",
            }

        } catch (error) {
            return error
        }
    },
    userSales: async function (id) {
        try {
            const totalVentas = await Payments.findAll({
                where: {buyer: id? id : {[Op.gt]: 0}, concept: 'venta'},
                attributes: [
                    [Sequelize.fn('SUM',Sequelize.col('PaymentAmount')), 'ventas']
                ],
                raw: true
            })
            return totalVentas[0].ventas? totalVentas[0].ventas : 0
        } catch (error) {
            return error
        }
    },
    userDonations: async function (id) {
        try {
            const totalDonations = await Payments.findAll({
                where: {buyer: id? id : {[Op.gt]: 0}, concept: 'donacion'},
                attributes: [
                    [Sequelize.fn('SUM',Sequelize.col('PaymentAmount')), 'donaciones']
                ],
                raw: true
            })
            return totalDonations[0].donaciones? totalDonations[0].donaciones : 0
        } catch (error) {
            return error
        }
    },
    userDevolutions: async function (id) {
        try {
            const totalDevolutions = await Payments.findAll({
                where: {buyer: id? id : {[Op.gt]: 0}, concept: 'devolucion'},
                attributes: [
                    [Sequelize.fn('SUM',Sequelize.col('PaymentAmount')), 'devoluciones']
                ],
                raw: true
            })
            return totalDevolutions[0].devoluciones? totalDevolutions[0].devoluciones : 0
        } catch (error) {
            return error
        }
    },
    averageSales: async function (id) {
        try {
            const {count, rows} = await Users.findAndCountAll({where: {id: id? id : {[Op.gt]: 0}}})
            const average = (await this.userSales(id) - await this.userDevolutions(id)) / count
            return average
        } catch (error) {
            return error
        }
    }
}

module.exports = DashboardService