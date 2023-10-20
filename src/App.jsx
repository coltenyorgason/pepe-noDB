import { PEPE_DATA } from "../server/data-mockup";  // Array of objects in its own seperate file
import "./App.css";
import PepeCrud from "./components/pepecrud";

function App() {
  return (
    <>
      <PepeCrud initialPepeData={PEPE_DATA} />
    </>
  );
}

export default App;
