import { useEffect } from 'react';

export const usePageTitle = (timeLeft: number) => {
    useEffect(() => {
        // Update the document title with the current timer
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.title = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds} - Pomodoro Timer`;

        // Revert the document title back to the original title when the timer stops
        return () => {
            document.title = "Pomodoro Timer";
        };
    }, [timeLeft]);
}
