import axios from "axios";
import { useState } from "react";

function pepeFunction(props) {
  const [edit, setEdit] = useState(false);
  let editName = ([editName, setEditName] = useState(""));
  const handleToggle = () => {
    setEdit(!edit);
  };
  const handleInput = () => {
    setEditName(val);
  };
  const updateInput = () => {
    let updatePepe = {
      name: editName,
    };
    axios
      .put("/editPepe/:id", updatePepe)
      .then((res) => {
        props.updatePepe(res.data);
        handleToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      =
      {!edit ? (
        <div>
          <h4>{props.pepe.name}</h4>
          <img src={props.pepe.image} alt="" />
          <button onClick={handleToggle}>Edit</button>
          <button onClick={handleDeletePepe}>Delete</button>
        </div>
      ) : (
        <div>
          <input
            onChange={(e) => handleInput(e.target.value)}
            value={editName}
            placeholder=""
          />
          <img src={props.pepe.image} alt="" />
          <button onClick={() => handleUpdatePepe(props.pepe.id)}>
            Submit
          </button>
          <button onClick={handleDeletePepe}>Delete</button>
        </div>
      )}
    </div>
  );
}
export default pepeFunction;
