import {useEffect} from "react";

const playSound = () => {
    // Define an array of audio file paths
    const audioFiles = ['/zte_ripple.mp3', '/lil_hi.mp3', '/oye_girl_voice.mp3'];

    // Get a random index within the range of audioFiles array
    const randomIndex = Math.floor(Math.random() * audioFiles.length);

    // Create an Audio object with the selected audio file
    const audio = new Audio(audioFiles[randomIndex]);

    // Play the selected audio
    audio.play();
    return;
};

export const useSoundEffects = (sessionStatus: boolean) => {
    useEffect(() => {
        const checkHourly = () => {
            const currentMinute = new Date().getMinutes();
            if (currentMinute === 0 && sessionStatus) {
                playSound()
            }
        };

        const hourlySoundInterval = setInterval(checkHourly, 60 * 1000);

        return () => clearInterval(hourlySoundInterval);
    }, [sessionStatus]);
};

export default playSound;