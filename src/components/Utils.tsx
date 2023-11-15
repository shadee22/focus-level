
export const labelMapping: { [label: string]: number } = {
    'none': 0,
    'low': 1,
    'medium': 2,
    'high': 3
};

export const reverseLabelsMapping: { [label: number]: string } = {
    0: 'No Focus',
    1: 'Low Focus',
    2: 'Medium Focus',
    3: 'High Focus '
};

export  const getColorForBar = (value: number): string => {
    switch(value) {
        case 3:
            return "white";
        case 2:
            return "slategray";

        case 1:
            return "gray";
        default:
            return "transparent"; // default color in case of unexpected values
    }
};

export const playSound = () => {
    // Define an array of audio file paths
    const audioFiles = ['/zte_ripple.mp3', '/lil_hi.mp3', '/oye_girl_voice.mp3'];

    // Get a random index within the range of audioFiles array
    const randomIndex = Math.floor(Math.random() * audioFiles.length);

    // Create an Audio object with the selected audio file
    const audio = new Audio(audioFiles[randomIndex]);

    // Play the selected audio
    audio.play();
};
export const playStartStopSound = () => {
    // Define an array of audio file paths
    const audioFile = '/bing.mp3'
    // Create an Audio object with the selected audio file
    const audio = new Audio(audioFile);
    // Play the selected audio
    audio.play();
};

export  const  convertTo12HourFormat = (time24Hour: any) =>  {
    // Validate input using a regular expression to match the format HH:MM
    const timeFormatRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
    if (!timeFormatRegex.test(time24Hour)) {
        throw new Error('Time must be a string in the format HH:MM');
    }

    // Extract hours and minutes from the time string
    const [hours24, minutes] = time24Hour.split(':').map(Number);

    // Determine AM or PM
    const period = hours24 < 12 ? 'AM' : 'PM';

    // Convert to 12-hour format
    const hours12 = hours24 % 12 || 12;

    // Format the hours and minutes, ensuring two digits
    const formattedHours = hours12.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Return the formatted time and period in an object
    return {
        time: `${formattedHours}:${formattedMinutes}`,
        am_pm: period
    };
}
