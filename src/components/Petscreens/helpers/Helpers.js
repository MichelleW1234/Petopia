import { petActivityTimeStampDamageList, petActivityTimeStampLastDamagedKey, petActivityTimeStampLastPerformedKey, audioNavButtonPressKey, petActivityTimeStampCleaningKey, audioActivityFailKey, petActivityTimeStampFeedingKey, audioScreenButtonPressKey, petHealthKey, petActivityTimeStampPlayingKey, audioQuitActivityKey, audioStartActivityKey, audioActivitySuccessKey, audioSelectionButtonPressKey } from "../../../constants/Constants.js";
import { helpers_Closer_Flags, helpers_Player_UIIndicatorSounds } from "../../../helpers/Helpers.js";


export const SelectionCorrectnessManager = (options_CurrDesiredOption, options_SelectionCorrectnessManager_UserSelection, set_Options_TotalNumber, set_Confirmed) => {

    helpers_Player_UIIndicatorSounds(audioSelectionButtonPressKey);

    if (options_SelectionCorrectnessManager_UserSelection !== options_CurrDesiredOption) {

        set_Options_TotalNumber(prev => prev*2);

    }

    set_Confirmed(true);

}




export const petScreensHelpers_Manager_PetHealth = (parameter_Number_Date, set_parameter_Sequence_PetTimeStamps, set_parameter_Sequence_PetList, parameter_String_ActivePetName, parameter_Key_petActivityTimeStamp, parameter_Number_DesiredOption, set_Parameter_Number_DesiredOption, set_Parameter_Number_UserSelection, set_Parameter_Boolean_Success) => {

    if (parameter_Number_DesiredOption === -1){
    //Too much (unwilling)

        helpers_Player_UIIndicatorSounds(audioActivityFailKey);

        set_parameter_Sequence_PetList(prev => ({

            ...prev,

            [parameter_String_ActivePetName]: {

                ...prev[parameter_String_ActivePetName],
                [petHealthKey]: Math.max(prev[parameter_String_ActivePetName][petHealthKey] - petActivityTimeStampDamageList[parameter_Key_petActivityTimeStamp], 0)
            }

        }));

    } else if (parameter_Number_DesiredOption !== set_Parameter_Number_UserSelection && parameter_Number_DesiredOption !== -1){
    // not desired option (willing)

        helpers_Player_UIIndicatorSounds(audioActivityFailKey);

        set_parameter_Sequence_PetList(prev => ({

            ...prev,

            [parameter_String_ActivePetName]: {

                ...prev[parameter_String_ActivePetName],
                [petHealthKey]: Math.max(prev[parameter_String_ActivePetName][petHealthKey] - 1, 0)
            }

        }));

    } else {

        helpers_Player_UIIndicatorSounds(audioActivitySuccessKey);
        set_Parameter_Boolean_Success(true);

    }

    set_parameter_Sequence_PetTimeStamps(prev => ({

        ...prev,

        [parameter_String_ActivePetName]: {
            
            ...prev[parameter_String_ActivePetName],
            [parameter_Key_petActivityTimeStamp]: {
                ...prev[parameter_String_ActivePetName][parameter_Key_petActivityTimeStamp],
                [petActivityTimeStampLastPerformedKey]: parameter_Number_Date         //THIS!!!!
            }
            
        }

    }));


    set_Parameter_Number_DesiredOption(-1);

}


export const petScreensHelpers_Canceller_PetImmersionSounds = (parameter_Audio_CurrAudio) => {

    parameter_Audio_CurrAudio.pause();
    parameter_Audio_CurrAudio.currentTime = 0;

}


export const petScreensHelpers_Navigator_Home = (set_Parameter_String_ActivePetName) => {

    helpers_Player_UIIndicatorSounds(audioNavButtonPressKey);
    set_Parameter_String_ActivePetName("");

}

export const petScreensHelpers_Canceller_Activities = (parameter_Ref_Audio, parameter_Boolean_OpenFlag) => {

    helpers_Player_UIIndicatorSounds(audioQuitActivityKey);
    petScreensHelpers_Canceller_PetImmersionSounds(parameter_Ref_Audio.current);
    helpers_Closer_Flags(parameter_Boolean_OpenFlag);

}


export const petScreensHelpers_Starter_Activities = (set_Parameter_Boolean_Start) => {

    helpers_Player_UIIndicatorSounds(audioScreenButtonPressKey);
    helpers_Player_UIIndicatorSounds(audioStartActivityKey);
    set_Parameter_Boolean_Start(true);

}
