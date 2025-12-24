import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { LastCheckedProvider } from './providers/LastCheckedProvider.jsx';
import {PetListProvider} from "./providers/PetListProvider.jsx";
import {PetEngineProvider} from "./providers/PetEngineProvider.jsx";
import { ActivePetNumberProvider } from './providers/ActivePetNumberProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LastCheckedProvider><PetListProvider><PetEngineProvider><ActivePetNumberProvider>
      <App />
    </ActivePetNumberProvider></PetEngineProvider></PetListProvider></LastCheckedProvider>
  </StrictMode>,
)
