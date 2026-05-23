import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {GlobalTimerProvider } from "./providers/GlobalTimerProvider.jsx";
import {PetTimeStampsProvider} from "./providers/PetTimeStampsProvider.jsx";
import {PetListProvider} from "./providers/PetListProvider.jsx";
import {PetProgressionUpdateProvider} from "./providers/PetProgressionUpdateProvider.jsx";
import { ActivePetNameProvider } from "./providers/ActivePetNameProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalTimerProvider><PetListProvider><PetTimeStampsProvider>
      <PetProgressionUpdateProvider><ActivePetNameProvider>
        <App />
      </ActivePetNameProvider></PetProgressionUpdateProvider>
    </PetTimeStampsProvider></PetListProvider></GlobalTimerProvider>
  </StrictMode>,
)
