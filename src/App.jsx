import {HashRouter, Routes, Route} from "react-router-dom";

import Homescreen from "./components/Homescreen/components/Homescreen.jsx";
import PetSelectionscreen from "./components/PetSelectionscreens/components/PetSelectionscreen.jsx";
import PetConfirmationscreen from "./components/PetSelectionscreens/components/PetConfirmationscreen.jsx";

import DogMainPetscreen from "./components/MainPetscreen/components/Dog/DogMainPetscreen.jsx";
import CatMainPetscreen from "./components/MainPetscreen/components/Cat/CatMainPetscreen.jsx";
import FishMainPetscreen from "./components/MainPetscreen/components/Fish/FishMainPetscreen.jsx";

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
          <Route path="/confirm" element={<PetConfirmationscreen/>}/>

          <Route path="/dogpet" element={<DogMainPetscreen />}/>
          <Route path="/catpet" element={<CatMainPetscreen />}/>
          <Route path="/fishpet" element={<FishMainPetscreen />}/>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
