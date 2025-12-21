import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import {PetListProvider} from "./providers/PetListProvider.jsx";
import { ActivePetNumberProvider } from './providers/ActivePetNumberProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PetListProvider><ActivePetNumberProvider>
      <App />
    </ActivePetNumberProvider></PetListProvider>
  </StrictMode>,
)
