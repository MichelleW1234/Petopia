import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {PetTimeStampsProvider} from "./providers/PetTimeStampsProvider.jsx";
import {PetListProvider} from "./providers/PetListProvider.jsx";
import {PetEngineProvider} from "./providers/PetEngineProvider.jsx";
import { ActivePetNumberProvider } from "./providers/ActivePetNumberProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PetListProvider><PetTimeStampsProvider><PetEngineProvider><ActivePetNumberProvider>
      <App />
    </ActivePetNumberProvider></PetEngineProvider></PetTimeStampsProvider></PetListProvider>
  </StrictMode>,
)
