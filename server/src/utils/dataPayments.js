const fs = require('fs');
const projects = require('./projects.json');
const Users = require('./users.json');

let payments = []
let currentOrder = 1
//let nextOrder = currentOrder+1

for (let i=0; i < 300;i++) {
    let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
    let UserId = Math.round((Users.length-1)*Math.random())+1
    payments = [
        ...payments,
        {
            product: ProjectId,
            buyer: UserId,
            paymentAmount: projects.data[ProjectId-1].price,
            status: 'completed',
            concept: 'venta',
            orderNumber: currentOrder,
            createdAt: new Date(2023,7+(Math.round(2*Math.random())),Math.round(30*Math.random()),0,0,0)
        }
    ]
    currentOrder +=1
}

for (let i = 0; i < 120; i++) {
    let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
    let UserId = Math.round((Users.length-1)*Math.random())+1
    payments = [
        ...payments,
        {
            product: ProjectId,
            buyer: UserId,
            paymentAmount: Math.round(Math.random()*5),
            status: 'completed',
            concept: 'donacion',
            orderNumber: currentOrder,
            createdAt: new Date(2023,7+(Math.round(2*Math.random())),Math.round(30*Math.random()),0,0,0)
        }
    ]
    currentOrder +=1
}

let ingresos = payments.filter((x) => x.concept == 'donacion' || x.concept == 'venta')

for (let i = 0; i < 60; i++) {
    let paymentDevolution = ingresos.shift()
    payments = [
        ...payments,
        {
            product: paymentDevolution.product,
            buyer: paymentDevolution.buyer,
            paymentAmount: paymentDevolution.paymentAmount,
            status: 'completed',
            concept: 'devolucion',
            orderNumber: currentOrder,
            createdAt: new Date(2023,7+(Math.round(2*Math.random())),Math.round(30*Math.random()),0,0,0)
        }
    ]
    currentOrder +=1
}

for (let i = 0; i < 200; i++){
    do {
        let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
        let UserId = Math.round((Users.length-1)*Math.random())+1
        payments = [
            ...payments,
            {
                product: ProjectId,
                buyer: UserId,
                paymentAmount: projects.data[ProjectId-1].price,
                status: 'completed',
                concept: 'venta',
                orderNumber: currentOrder,
                createdAt: new Date(2023,7+(Math.round(2*Math.random())),Math.round(30*Math.random()),0,0,0)
            }
        ]
        i += 1
    }
    while (i % 4 !== 0)
    currentOrder +=1
}

fs.writeFileSync(__dirname+'/payments.json',JSON.stringify(payments,0,4),'utf-8')