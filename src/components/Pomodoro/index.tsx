import React, {useState, useEffect} from 'react';

const TimerButton = ({label, onClick}: any) => {
    return (
        <button
            className="rounded-full px-8 border border-gray-400 bg-white py-2 font-bold"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

const TimerDisplay = ({minutes, seconds}: any) => {
    return (
        <div className="text-6xl font-semibold text-white mb-4">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

const Pomodoro = () => {
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: any = null;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (!isActive && time !== 0 && time === 25 * 60) {
            clearInterval(interval);
        }

        if (time === 0) {
            alert(isPomodoro ? 'Pomodoro finished. Take a break!' : 'Break time is over. Start another Pomodoro!');
            setIsPomodoro(!isPomodoro);
            setTime(isPomodoro ? 5 * 60 : 25 * 60);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, time, isPomodoro]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className=" max-w-sm mx-auto p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="flex mb-4">
        <span
            className={`cursor-pointer px-4 py-2 ${isPomodoro ? 'text-white/80 font-semibold' : 'text-white/50'}`}
            onClick={() => {
                setIsPomodoro(true);
                setTime(25 * 60);
                setIsActive(false);
            }}
        >
          Pomodoro
        </span>
                <span
                    className={`cursor-pointer px-4 py-2 ${!isPomodoro ? 'text-white/80 font-semibold' : 'text-white/50'}`}
                    onClick={() => {
                        setIsPomodoro(false);
                        setTime(5 * 60);
                        setIsActive(false);
                    }}
                >
                    Short Break
                </span>
            </div>
            <TimerDisplay minutes={minutes} seconds={seconds}/>
            <TimerButton label={isActive ? 'PAUSE' : 'START'} onClick={toggleTimer}/>
        </div>
    );
};

export default Pomodoro;
