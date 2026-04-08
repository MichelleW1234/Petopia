import {HashRouter, Routes, Route} from "react-router-dom";

import Homescreen from "./components/Homescreen/components/Home.jsx";
import PetSelectionscreen from "./components/PetSelectionscreen/components/PetSelection.jsx";

import Dogscreen from "./components/Petscreens/components/Dog.jsx";
import Catscreen from "./components/Petscreens/components/Cat.jsx";
import Fishscreen from "./components/Petscreens/components/Fish.jsx";

import NoPage from "./components/NoPage.jsx";

import "./App.css";


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Homescreen/>}/>
            
          <Route path="/home" element={<Homescreen />}/>
          <Route path="/select" element={<PetSelectionscreen/>}/>

          <Route path="/dog" element={<Dogscreen />}/>
          <Route path="/cat" element={<Catscreen />}/>
          <Route path="/fish" element={<Fishscreen />}/>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
