import { useState, useEffect } from 'react';

const usePomodoroTimer = (pomodoroTime: number, shortBreakTime: number) => {
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [timeLeft, setTimeLeft] = useState(isPomodoro ? pomodoroTime : shortBreakTime);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        let intervalId: number = 0 ;

        if (isActive && startTime) {
            intervalId = window.setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = Math.floor((currentTime - startTime) / 1000);
                const remainingTime = (isPomodoro ? pomodoroTime : shortBreakTime) - elapsedTime;

                if (remainingTime <= 0) {
                    window.clearInterval(intervalId);
                    setIsPomodoro(!isPomodoro);
                    setTimeLeft(isPomodoro ? shortBreakTime : pomodoroTime);
                    setIsActive(false);
                    setStartTime(null);
                    alert(isPomodoro ? 'Pomodoro finished. Take a break!' : 'Break time is over. Start another Pomodoro!');
                } else {
                    setTimeLeft(remainingTime);
                }
            }, 1000);
        }


        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
                document.title = "Pomodoro Timer";
            }
        };
    }, [isActive, startTime, isPomodoro, pomodoroTime, shortBreakTime]);

    const toggleTimer = () => {
        if (!isActive) {
            setStartTime(Date.now() - ((pomodoroTime - timeLeft) * 1000));
        } else {
            setStartTime(null);
        }
        setIsActive(!isActive);
    };

    const resetTimer = (pomodoro: boolean) => {
        setIsPomodoro(pomodoro);
        setTimeLeft(pomodoro ? pomodoroTime : shortBreakTime);
        setIsActive(false);
        setStartTime(null);
    };

    return { isPomodoro, timeLeft, isActive, toggleTimer, resetTimer };
};

export default usePomodoroTimer;
