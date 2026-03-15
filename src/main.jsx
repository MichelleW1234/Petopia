import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {PetTimeStampsProvider} from "./providers/PetTimeStampsProvider.jsx";
import {PetListProvider} from "./providers/PetListProvider.jsx";
import {PetEngineProvider} from "./providers/PetEngineProvider.jsx";
import { ActivePetNameProvider } from "./providers/ActivePetNameProvider.jsx";
import { FinalPetSelectionProvider } from "./components/PetSelectionscreens/providers/FinalPetSelectionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PetListProvider><PetTimeStampsProvider><PetEngineProvider>
      <ActivePetNameProvider><FinalPetSelectionProvider>
        <App />
      </FinalPetSelectionProvider></ActivePetNameProvider>
    </PetEngineProvider></PetTimeStampsProvider></PetListProvider>
  </StrictMode>,
)
