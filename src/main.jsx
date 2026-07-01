import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {GlobalTimerProvider } from "./providers/GlobalTimerProvider.jsx";
import {PetTimeStampsProvider} from "./providers/PetTimeStampsProvider.jsx";
import {PetListProvider} from "./providers/PetListProvider.jsx";
import {PetProgressionUpdateProvider} from "./providers/PetProgressionUpdateProvider.jsx";
import { ActivePetNameProvider } from "./providers/ActivePetNameProvider.jsx";
import { BackgroundMusicProvider } from "./providers/BackgroundMusicProvider.jsx";
import { VolumeProvider } from "./providers/VolumeProvider.jsx";
import { RoomProvider } from "./providers/RoomProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VolumeProvider>
      <BackgroundMusicProvider><GlobalTimerProvider><PetListProvider><PetTimeStampsProvider><RoomProvider>
        <PetProgressionUpdateProvider><ActivePetNameProvider>
          <App />
        </ActivePetNameProvider></PetProgressionUpdateProvider>
      </RoomProvider></PetTimeStampsProvider></PetListProvider></GlobalTimerProvider></BackgroundMusicProvider>
    </VolumeProvider>
  </StrictMode>,
)
