export default function handler(req, res) {
  res.status(200).json({
    data: [
      {
        id: 1,
        name: "Ruby on Rails",
        price: "50",
        description:
          "Se trata de una estructura de Modelo-Vista -Controlador (MVC) que proporciona una manera estandarizada de desarrollar aplicaciones web.Ruby on Rails es uno de los frameworks más populares para el desarrollo web, y se ha utilizado en algunos de los sitios web más grandes del mundo, incluyendo Twitter, Bloomberg y Airbnb.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["4", "12", "13"],
        category: "3",
      },
      {
        id: 2,
        name: "Laravel",
        price: "67.8",
        description:
          "Se trata de una estructura MVC que proporciona una manera estandarizada de desarrollar aplicaciones web.Laravel es uno de los frameworks PHP más populares, y se ha utilizado en algunos de los sitios web más grandes del mundo, incluyendo Bitbucket y Envato.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["13", "14"],
        category: "3",
      },
      {
        id: 3,
        name: "Django",
        price: "40",
        description:
          "Django es un framework de aplicaciones web de código abierto escrito en Python. Se trata de una estructura MVC que proporciona una manera estandarizada de desarrollar aplicaciones web.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["14"],
        category: "3",
      },
      {
        id: 4,
        name: "Symfony",
        price: "free",
        description:
          "Symfony es un framework de aplicaciones web de código abierto escrito en PHP. Es un framework MVC que proporciona una forma estandarizada de desarrollar aplicaciones web",
        image: "https://random.imagecdn.app/350/218",
        tags: ["2", "13", "6"],
        category: "3",
      },
      {
        id: 5,
        name: "WooCommerce",
        price: "150",
        description:
          "WooCommerce acepta las principales tarjetas de crédito y pagos por transferencia bancaria y se integra perfectamente con 140 pasarelas de pago propias de cada región.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["9", "6", "13", "14"],
        category: "4",
      },
      {
        id: 6,
        name: "MAutoPitch",
        price: "free",
        description:
          "Plugin de corrección automática de tono (tipo Auto-tune) con un sonido excelente y funciones de cambio de formante y expansión estéreo. Una de las mejores alternativas free a los clásicos plugins para afinar voz de pago de antares y waves.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["10", "11", "13"],
        category: "4",
      },
      {
        id: 7,
        name: "Valhalla Space Modulator",
        price: "free",
        description:
          "Un flanger gratuito de la fantástica compañía Valhalla. Once algoritmos para obtener todo tipo de efectos que desafían cualquier descripción. A destacar los efectos que podemos conseguir automatizando los parámetros en nuestro DAW o mediante un teclado controlador MIDI.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["2", "6", "7"],
        category: "4",
      },
      {
        id: 8,
        name: "AE Flame",
        price: "free",
        description:
          "Este es un efecto que genera hermosos fractales de colores que pueden ser animados. Con opciones de color, intensidad, densidad, etc., también son altamente personalizables para que puedas obtener el efecto preciso que buscas.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["6", "7", "8", "13"],
        category: "4",
      },
      {
        id: 9,
        name: "Joomla!",
        price: "3",
        description:
          "Joomla es una excelente opción si necesitas administrar muchos ‘tipos de publicaciones personalizadas’. Es decir, es ideal si quieres ejecutar un sitio web que no se base en gran medida en el contenido de texto. La plataforma también ofrece muchas más opciones en lo que respecta a la administración de usuarios. Esto lo convierte en una opción fantástica para sitios basados ​​en membresía, por ejemplo.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["4", "5", "6"],
        category: "1",
      },
      {
        id: 10,
        name: "Drupal",
        price: "7",
        description:
          "Ofrece un sistema muy flexible para tratar con tipos de publicaciones personalizadas. También te da un alto grado de control sobre tus usuarios y sus permisos, e incluso puede manejar sitios multilingües de manera inmediata.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["2", "11", "13", "14"],
        category: "1",
      },
      {
        id: 11,
        name: "ImpressPages",
        price: "free",
        description:
          "Brinda una de las mejores experiencias de blogs que hemos visto hasta ahora. Su editor es limpio y cuenta con una interfaz moderna. Además, te permite agregar algunos elementos que otros CMS no tienen, al menos sin extensiones, como mapas y formularios.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["4", "7", "14"],
        category: "1",
      },
      {
        id: 12,
        name: "Contabilium",
        price: "34.7",
        description:
          "Sistema de gestión y facturación electronica online. Automatiza tus tareas administrativas: Facturación electrónica integrada a tu eCommerce, Control de stock multi-depósito, Reportes automáticos",
        image: "https://random.imagecdn.app/350/218",
        tags: ["2", "15"],
        category: "1",
      },
      {
        id: 13,
        name: "Heroku",
        price: "290",
        description:
          "Heroku es un programa de desarrollo de aplicaciones en la nube que ofrece soporte para numerosos lenguajes de programación diferentes, incluidos Java, Python, PHP y otros.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["3", "6", "13"],
        category: "2",
      },
      {
        id: 14,
        name: "Ionic ",
        price: "free",
        description:
          "Ionic ofrece una compatibilidad avanzada para numerosos dispositivos y otro software de desarrollo, varios componentes JavaScript y el complemento Cordova (proporciona una interfaz JavaScript para componentes nativos). ",
        image: "https://random.imagecdn.app/350/218",
        tags: ["13", "8", "1"],
        category: "2",
      },
      {
        id: 15,
        name: "Stencyl",
        price: "free",
        description:
          "Centrado en el desarrollo de videojuegos en 2D. Intuitivo y multiplataforma (Windows, Mac, Linux, Android, iOS, HTML5, Flash), ofrece herramientas para diseñar escenarios y personajes.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["5", "8", "15"],
        category: "2",
      },
      {
        id: 16,
        name: "Godot Engine",
        price: "free",
        description:
          "Godot es un programa ligero, gratuito y open source cuya popularidad crece día a día. Está disponible para Windows, Linux y Mac, y permite generar ejecutables también para Android e iOS, así como exportar a HTML5.",
        image: "https://random.imagecdn.app/350/218",
        tags: ["9", "8", "13", "14"],
        category: "2",
      },
    ],
  });
}
