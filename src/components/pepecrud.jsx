import React, { useState, useEffect } from "react";
import axios from "axios";

const PepeCrud = ({ initialPepeData }) => {
  const [PepeDataState, setPepeData] = useState(initialPepeData);
  const [newPepeName, setNewPepeName] = useState("");
  const [newPepeURL, setNewPepeURL] = useState("");
  const [newPepeData, setNewPepeData] = useState([]);
  const [editPepeData, setEditPepeData] = useState(null); // State for editing


  const handleNewPepeNameChange = (e) => {
    setNewPepeName(e.target.value);
  };

  const handleNewPepeURLChange = (e) => {
    setNewPepeURL(e.target.value);
  };

  useEffect(() => {
    axios.get("/api/getPepe")
      .then((response) => {
        setPepeData(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const newPepe = async () => {
    try {
      const pepeToPost = {
        id: "",
        name: newPepeName,
        URL: newPepeURL,
      };

      const response = await axios.post("/pepe/addPepe", pepeToPost);

      if (!response.data.error) {
        setPepeData([...PepeDataState, response.data]);
        setNewPepeData([...newPepeData, response.data]);
        console.log("Updated PepeDataState:", PepeDataState);
        setNewPepeName("");
        setNewPepeURL("");
      } else {
      }
    } catch (error) {
      console.error("Error adding new Pepe:", error);
    }
  };
  console.log("Current PepeDataState:", PepeDataState);

  const editPepe = async () => {
    // Logic to edit an item in the array
    try {
      // Check if the ID exists in existing data
      const existingPepeIndex = PepeDataState.findIndex((pepe) => pepe.id === editPepeData.id);

      if (existingPepeIndex !== -1) {
        // Update existing data
        const updatedPepeData = PepeDataState.map((pepe) =>
          pepe.id === editPepeData.id ? { ...pepe, name: editPepeData.name, URL: editPepeData.URL } : pepe
        );
        setPepeData(updatedPepeData);
      } else {
        // Check if the ID exists in newly added data
        const newPepeIndex = newPepeData.findIndex((pepe) => pepe.id === editPepeData.id);

        if (newPepeIndex !== -1) {
          // Update newly added data
          const updatedNewPepeData = newPepeData.map((pepe) =>
            pepe.id === editPepeData.id ? { ...pepe, name: editPepeData.name, URL: editPepeData.URL } : pepe
          );
          setNewPepeData(updatedNewPepeData);
        } else {
          console.log("Pepe not found in both existing and newly added data");
        }
      }
    } catch (error) {
      console.error("Error editing Pepe:", error);
    }

    setEditPepeData(null); // Clear the edit state
  };

const deletePepe = async (id) => {
  console.log("Delete button clicked for Pepe with ID:", id);
  try {
    // Check if the ID exists in existing data
    const existingPepeIndex = PepeDataState.findIndex((pepe) => pepe.id === id);

    if (existingPepeIndex !== -1) {
      // Remove from existing data
      const updatedPepeData = PepeDataState.filter((pepe) => pepe.id !== id);
      setPepeData(updatedPepeData);
    } else {
      // Check if the ID exists in newly added data
      const newPepeIndex = newPepeData.findIndex((pepe) => pepe.id === id);

      if (newPepeIndex !== -1) {
        // Remove from newly added data
        const updatedNewPepeData = newPepeData.filter((pepe) => pepe.id !== id);
        setNewPepeData(updatedNewPepeData);
      } else {
        console.log("Pepe not found in both existing and newly added data");
      }
    }
  } catch (error) {
    console.error("Error deleting Pepe:", error);
  }
};


  return (
    <div>
      <h1>ANOTHA ONE</h1>
     <ul>
        {PepeDataState.map((pepe) => (
          <li key={pepe.id}>
            {pepe === editPepeData ? (
              // Edit form when editing
              <div>
                <input
                  type="text"
                  value={editPepeData.name}
                  onChange={(e) => setEditPepeData({ ...editPepeData, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editPepeData.URL}
                  onChange={(e) => setEditPepeData({ ...editPepeData, URL: e.target.value })}
                />
                <button onClick={editPepe}>Save</button>
              </div>
            ) : (
              // Display Pepe data
              <>
                {pepe.name}
                <img src={pepe.URL} alt="" />
                <button onClick={() => deletePepe(pepe.id)}>Delete</button>
                <button onClick={() => setEditPepeData(pepe)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Add New Pepe</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={newPepeName}
              onChange={handleNewPepeNameChange}
            />
          </div>
          <div>
            <label>URL:</label>
            <input
              type="text"
              value={newPepeURL}
              onChange={handleNewPepeURLChange}
            />
          </div>
          <button onClick={newPepe}>Add New Pepe</button>
        </form>
      </div>
    </div>
  );
};
export default PepeCrud;