const fs = require("fs");
const categories = require("./categories.json");
const data = require('/projects.json')

let status1 = [
  "Released",
  "In Development",
  "Prototype",
  "Canceled",
  "On hold",
];

for (let prop in data.data) {
  let { id, name, description, price, image, tags } = data.data[prop];
  data = {
    data: [
      ...data.data,
      {
        name,
        description,
        price,
        image: `https://random.imagecdn.app/350/21${prop}`,
        visibility: true,
        shortDescription: `Lorem ipsum ${data.data[prop].name}`,
        commentsAllowed: true,
        views: parseInt(prop),
        status: status1[Math.round((status1.length - 1) * Math.random())],
      },
    ],
  };
}

let filter = { data: data.data.filter((x) => x.shortDescription) };
fs.writeFileSync(
  __dirname + "/projects.json",
  JSON.stringify(filter, 0, 4),
  "utf-8"
);
