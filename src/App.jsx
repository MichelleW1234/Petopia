import {HashRouter, Routes, Route} from 'react-router-dom';

import Homescreen from "./components/Homescreen/components/Homescreen.jsx";

import DogMainPetscreen from "./components/MainPetscreen/components/Dog/DogMainPetscreen.jsx";
import DogFeedscreen from "./components/Feedscreen/components/Dog/DogFeedscreen.jsx";
import DogPlayscreen from "./components/Playscreen/components/Dog/DogPlayscreen.jsx";
import DogWashscreen from "./components/Washscreen/components/Dog/DogWashscreen.jsx";

import CatMainPetscreen from "./components/MainPetscreen/components/Cat/CatMainPetscreen.jsx";
import CatFeedscreen from "./components/Feedscreen/components/Cat/CatFeedscreen.jsx";
import CatPlayscreen from "./components/Playscreen/components/Cat/CatPlayscreen.jsx";

import FishMainPetscreen from "./components/MainPetscreen/components/Fish/FishMainPetscreen.jsx";
import FishFeedscreen from "./components/Feedscreen/components/Fish/FishFeedscreen.jsx";
import FishWashscreen from "./components/Washscreen/components/Fish/FishWashscreen.jsx";

import NoPage from "./components/NoPage.jsx";

import './App.css';


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Homescreen/>}/>
            
          <Route path="/home" element={<Homescreen />}/>

          <Route path="/dogpet" element={<DogMainPetscreen />}/>
          <Route path="/dogfeed" element={<DogFeedscreen />}/>
          <Route path="/dogplay" element={<DogPlayscreen />}/>
          <Route path="/dogwash" element={<DogWashscreen />}/>

          <Route path="/catpet" element={<CatMainPetscreen />}/>
          <Route path="/catfeed" element={<CatFeedscreen />}/>
          <Route path="/catplay" element={<CatPlayscreen />}/>

          <Route path="/fishpet" element={<FishMainPetscreen />}/>
          <Route path="/fishfeed" element={<FishFeedscreen />}/>
          <Route path="/fishwash" element={<FishWashscreen />}/>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
