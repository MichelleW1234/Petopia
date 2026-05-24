import button_click from "../Music/button_click.mp3";
import asleep from "../Music/asleep.mp3";
import cat from "../Music/cat.mp3";
import dog from "../Music/dog.mp3";
import fish from "../Music/fish.mp3";

import { buttonSoundKey, asleepSoundKey, dogSoundKey, catSoundKey, fishSoundKey } from "../constants/Constants";


export const playSound = (soundEffect) => {

    const soundDictionary = {

        [buttonSoundKey] : [button_click, 0.5],
        [asleepSoundKey] : [asleep, 0.5],
        [dogSoundKey] : [dog, 0.3],
        [catSoundKey] : [cat, 0.3],
        [fishSoundKey] : [fish, 0.3],

    };

    const entry = soundDictionary[soundEffect];
    const [soundFile, volume] = entry;
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

}