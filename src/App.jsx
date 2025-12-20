import Homescreen from "./components/Homescreen.jsx";
import NoPage from "./components/NoPage.jsx";

import {HashRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Homescreen/>}/>
            
          <Route path="/home" element={<Homescreen />}/>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
