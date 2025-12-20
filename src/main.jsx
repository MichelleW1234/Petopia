import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import {PetListProvider} from "./providers/PetListProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PetListProvider>
      <App />
    </PetListProvider>
  </StrictMode>,
)
