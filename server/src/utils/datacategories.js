const fs = require('fs')

let array = ['Plantillas y Temas para Sitios Web','Herramientas de Desarrollo y Software', 'Paquetes de Desarrollo Personalizado','Plugins y Extensiones Personalizadas']
let description = ["Ofrecer plantillas y temas pre-diseñados para diferentes plataformas y sistemas de gestión de contenido (como WordPress, Shopify, etc.).",
    "Software de desarrollo, herramientas de edición de código, plugins y extensiones para optimizar el proceso de desarrollo",
    "Ofrecer paquetes de desarrollo web personalizado para proyectos específicos de clientes",
    "Desarrollar y vender plugins y extensiones personalizadas para plataformas CMS y sistemas de comercio electrónico"
]
let data = []
for (const prop in array) {
    data = [
        ...data,{
            name: array[prop],
            description: description[prop]
        }
        
    ]
}

fs.writeFileSync(__dirname+'/categories.json',JSON.stringify(data,'','\n'),'utf-8')