let PEPE_DATA = [
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

let globalId = 2;

const handlerFunctions = {
  getPepe: (req, res) => {
    res.send(PEPE_DATA);
  },

  addPepe: (req, res) => {
    const { id, name, URL } = req.body;

    const pepeObj = {
      id: globalId,
      name: name,
      URL: URL,
    };

    PEPE_DATA.push(pepeObj);

    globalId++;

    res.send(pepeObj);
  },

  deletePepe: (req, res) => {
    const id = req.params.id;
    PEPE_DATA = PEPE_DATA.filter((pepe) => pepe.id !== +id);
    res.send(PEPE_DATA);
  },

  editPepe: (req, res) => {
    const { PepeTheFrog } = req.params
    const { id, name, URL } = req.body

    const pepeIndex = PEPE_DATA.findIndex(Pepe => pepe.id == id)
    const pepeItem = PEPE_DATA[pepeIndex]

    pepeItem.id = id
    pepeItem.name = name
    pepeItem.URL = URL
}
};

export default handlerFunctions