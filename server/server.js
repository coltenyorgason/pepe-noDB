import express from "express";
import ViteExpress from "vite-express";

import handlerFunctions from "./controllers.js";

// Variable for .listen() Method
const port = 8000;
const app = express();

// Middlware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

// =====Routes=====
// Gets the army of pepes
app.get("/api/getPepe", handlerFunctions.getPepe);

// Creates a new Pepe
app.post("/pepe/addPepe", handlerFunctions.createPepe);

// Delete Pepe
app.delete("/pepe/deletePepe/:id", handlerFunctions.deletePepe);

// Edits Pepe
app.put("/editPepe/:id", handlerFunctions.editPepe);

ViteExpress.listen(app, port, () =>
  console.log(`Pepe lurkin, Check http://localhost:${port}/`)
);
