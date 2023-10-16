import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.use(express.json());

const PEPE_DATA = [
  {
    id: 0,
    name: "Pepe Photo",
    URL: "https://tenor.com/view/pepe-on-goose-goose-pepe-goose-goose-frog-frog-and-goose-gif-8393333380471030616",
  },
  {
    id: 1,
    name: "Pepe Happy ",
    URL: "https://media.tenor.com/E6idhcXRgBcAAAAM/peppo-pepe.gif",
  },
];

import handlerFunctions from "./controller.js";

//Routes
app.get('/pepe', handlerFunctions.getPepe)
app.post('/addPepe', handlerFunctions.addPepe)
app.delete('/deletePepe/:id', handlerFunctions.deletePepe)
app.put('/editPepe/:id', handlerFunctions.editPepe)

ViteExpress.listen(app, 3360, () =>
  console.log(`Pepe Server Request, Report to http://localhost:3360/`)
);
