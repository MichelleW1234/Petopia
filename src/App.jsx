import {HashRouter, Routes, Route} from 'react-router-dom';

import Homescreen from "./components/Homescreen/components/Homescreen.jsx";
import MainPetscreen from "./components/MainPetscreen/components/MainPetscreen.jsx";
import Feedscreen from "./components/Feedscreen/components/Feedscreen.jsx";
import Playscreen from "./components/Playscreen/components/Playscreen.jsx";
import Washscreen from "./components/Washscreen/components/Washscreen.jsx";

import NoPage from "./components/NoPage.jsx";

import './App.css';


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Homescreen/>}/>
            
          <Route path="/home" element={<Homescreen />}/>
          <Route path="/pet" element={<MainPetscreen />}/>
          <Route path="/feed" element={<Feedscreen />}/>
          <Route path="/play" element={<Playscreen />}/>
          <Route path="/wash" element={<Washscreen />}/>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
