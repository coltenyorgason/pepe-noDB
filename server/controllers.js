import { PEPE_DATA } from "./data-mockup.js"; // Array of objects in its own seperate file

let globalId = 2;

const handlerFunctions = {
  // Displays the current data of the array
  getPepe: (req, res) => {
    res.send(PEPE_DATA);
  },
  // Creates new object for array. Pushes this at the end of the new object called newPepe and increases its id by 1
  createPepe: (req, res) => {
    const { name, URL } = req.body;

    const newPepe = {
      id: globalId,
      name: name,
      URL: URL,
    };

    PEPE_DATA.push(newPepe);
    globalId++;

    res.send(newPepe);
  },
  // Ability to edit Pepe
  editPepe: (req, res) => {
    const { id } = req.params;
    const { name, URL } = req.body;

    const index = PEPE_DATA.findIndex((pepe) => pepe.id === +id);
    const pepe = PEPE_DATA[index];

    pepe.name = name;
    pepe.URL = URL;

    res.send(pepe);
  },

  // This should delete Pepe based off of the Id
  deletePepe: (req, res) => {
    PEPE_DATA = PEPE_DATA.filter((pepe) => pepe.id !== +req.params.id);
    res.send(PEPE_DATA);
  },
};

export default handlerFunctions;
{
  PEPE_DATA;
}