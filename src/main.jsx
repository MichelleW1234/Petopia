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
import { InventoryProvider } from "./providers/InventoryProvider.jsx";
import { AchievementsProvider } from "./providers/AchievementsProvider.jsx";
import { NotificationsProvider } from "./providers/NotificationsProvider.jsx";


const currentVersion = "1.0.1";
const savedVersion = localStorage.getItem("PetopiaAppVersion");
if (savedVersion !== currentVersion) {
  localStorage.clear();
  localStorage.setItem("PetopiaAppVersion", currentVersion);
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VolumeProvider>
      <BackgroundMusicProvider><GlobalTimerProvider><PetListProvider><PetTimeStampsProvider><RoomProvider><InventoryProvider><NotificationsProvider>
        <AchievementsProvider><PetProgressionUpdateProvider><ActivePetNameProvider><ActiveCheckoutRoomProvider>
          <App />
        </ActiveCheckoutRoomProvider></ActivePetNameProvider></PetProgressionUpdateProvider></AchievementsProvider>
      </NotificationsProvider></InventoryProvider></RoomProvider></PetTimeStampsProvider></PetListProvider></GlobalTimerProvider></BackgroundMusicProvider>
    </VolumeProvider>
  </StrictMode>,
)
