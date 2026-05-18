import {HashRouter, Routes, Route} from "react-router-dom";
import { useEffect } from "react";

import Homescreen from "./components/Homescreen/components/Home.jsx";
import Adoptionscreen from "./components/Adoptionscreen/components/Adoption.jsx";

import Dogscreen from "./components/Petscreens/components/Dog/Dog.jsx";
import Catscreen from "./components/Petscreens/components/Cat/Cat.jsx";
import Fishscreen from "./components/Petscreens/components/Fish/Fish.jsx";

import NoPage from "./components/NoPage.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

import { portraitPetImages, moodPetImages } from "./constants/Constants.js";

import "./App.css";


function App() {

  // For preloading images in Constants.js (globally used images):
  useEffect(() => {

    const preloadImages = [...Object.values(portraitPetImages).flat(1), ...Object.values(moodPetImages).flat(2)];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

  }, []);

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Homescreen/>}/>
            
          <Route path="/home" element={<Homescreen />}/>
          <Route path="/adopt" element={<Adoptionscreen/>}/>

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
