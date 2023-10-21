const fs = require('fs');
const projects = require('./projects.json');
const Users = require('./users.json');

let payments = []
let currentOrder = 1
//let nextOrder = currentOrder+1

for (let i=0; i < 50;i++) {
    let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
    let UserId = Math.round((Users.length-1)*Math.random())+1
    payments = [
        ...payments,
        {
            product: ProjectId,
            buyer: UserId,
            PaymentAmount: projects.data[ProjectId-1].price,
            type: 'ingreso',
            concept: 'venta',
            orderNumber: currentOrder
        }
    ]
    currentOrder +=1
}

for (let i = 0; i < 20; i++) {
    let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
    let UserId = Math.round((Users.length-1)*Math.random())+1
    payments = [
        ...payments,
        {
            product: ProjectId,
            buyer: UserId,
            PaymentAmount: Math.round(Math.random()*5),
            type: 'ingreso',
            concept: 'donacion',
            orderNumber: currentOrder
        }
    ]
    currentOrder +=1
}

let ingresos = payments.filter((x) => x.type == 'ingreso')

for (let i = 0; i < 10; i++) {
    let paymentDevolution = ingresos.shift()
    payments = [
        ...payments,
        {
            product: paymentDevolution.product,
            buyer: paymentDevolution.buyer,
            PaymentAmount: paymentDevolution.PaymentAmount,
            type: 'egreso',
            concept: 'devolucion',
            orderNumber: currentOrder
        }
    ]
    currentOrder +=1
}

for (let i = 0; i < 50; i++){
    do {
        let ProjectId = Math.round((projects.data.length-1)*Math.random())+1
        let UserId = Math.round((Users.length-1)*Math.random())+1
        payments = [
            ...payments,
            {
                product: ProjectId,
                buyer: UserId,
                PaymentAmount: projects.data[ProjectId-1].price,
                type: 'ingreso',
                concept: 'venta',
                orderNumber: currentOrder
            }
        ]
        i += 1
    }
    while (i % 4 !== 0)
    currentOrder +=1
}

fs.writeFileSync(__dirname+'/payments.json',JSON.stringify(payments,0,4),'utf-8')