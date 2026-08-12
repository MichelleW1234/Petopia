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
import { ActiveCheckoutRoomProvider } from "./providers/ActiveCheckoutRoomProvider.jsx";
import { PetInventoryProvider } from "./providers/PetInventoryProvider.jsx";


const currentVersion = "1.0.0";
const savedVersion = localStorage.getItem("PetopiaAppVersion");
if (savedVersion !== currentVersion) {
  localStorage.clear();
  localStorage.setItem("PetopiaAppVersion", currentVersion);
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VolumeProvider>
      <BackgroundMusicProvider><GlobalTimerProvider><PetListProvider><PetTimeStampsProvider><RoomProvider><PetInventoryProvider>
        <PetProgressionUpdateProvider><ActivePetNameProvider><ActiveCheckoutRoomProvider>
          <App />
        </ActiveCheckoutRoomProvider></ActivePetNameProvider></PetProgressionUpdateProvider>
      </PetInventoryProvider></RoomProvider></PetTimeStampsProvider></PetListProvider></GlobalTimerProvider></BackgroundMusicProvider>
    </VolumeProvider>
  </StrictMode>,
)
