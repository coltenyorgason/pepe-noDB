import { useState } from "react";
import axios from 'axios'
import PepeMemin from "./PepeMemin";

function Pepe() {
    const [pepe, setPepe] = useState([]);
    const [pepeName, setPepeName] = useState('');
    const [pepeImage, setPepeImage] = useState('');
  
    useEffect(() => {
      handleGetPepe();
    }, []);
  
    const handleName = (val) => {
      setPepeName(val);
    };
  
    const handleImage = (val) => {
      setPepeImage(val);
    };
  
    const handleGetPepe = () => {
      axios.get('/pepe')
        .then((res) => {
          console.log(res.data);
          setPepe(res.data);
        });
    };
  
    const handleAddPepe = () => {
      axios.post('/addPepe', { name: pepeName, image: pepeImage })
        .then((res) => {
          setPepe(res.data);
        });
      setPepeName('');
      setPepeImage('');
    };
  
    const handleUpdatePepe = (data) => {
      setPepe(data);
    };
  
    const handleDeletePepe = (data) => {
      setPepe(data);
    };
  
    const mappedPepe = pepe.map((element, i) => (
      <PepeMemin key={i} pepe={element} updatePepe={handleUpdatePepe} deletePepe={handleDeletePepe} />
    ));
  
    return (
      <div className="main-body">
        <div className="hero1">
          <h1>meme'in since 05</h1>
        </div>
        <div className="btn-body">
          <input
            onChange={(e) => handleName(e.target.value)}
            value={pepeName}
            placeholder="Enter Meme"
          />
          <input
            onChange={(e) => handleImage(e.target.value)}
            value={pepeImage}
            placeholder="Enter Image URL"
          />
          <button onClick={handleAddPepe}>Add Pepe</button>
        </div>
        <div className="pepe">{mappedPepe}</div>
      </div>
    );
  }
  
  export default Pepe;