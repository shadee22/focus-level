import React from 'react';
import TimerButton from "./TimerButton";
import {TimerDisplay} from "./TimerDisplay";
import usePomodoroTimer from "./usePomodoroTimer";
import {usePageTitle} from "./pageTitle";

const Pomodoro: React.FC = () => {
    const pomodoroTime = 25 * 60; // 25 minutes
    const shortBreakTime = 5 * 60; // 5 minutes
    const {
        isPomodoro,
        timeLeft,
        isActive,
        toggleTimer,
        resetTimer
    } = usePomodoroTimer(pomodoroTime, shortBreakTime);

    usePageTitle(timeLeft);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="max-w-sm mx-auto p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="flex mb-4">
        <span
            className={`cursor-pointer px-4 py-2 ${isPomodoro ? 'text-white/80 font-semibold' : 'text-white/50'}`}
            onClick={() => resetTimer(true)}
        >
          Pomodoro
        </span>
                <span
                    className={`cursor-pointer px-4 py-2 ${!isPomodoro ? 'text-white/80 font-semibold' : 'text-white/50'}`}
                    onClick={() => resetTimer(false)}
                >
          Short Break
        </span>
            </div>
            <TimerDisplay minutes={minutes} seconds={seconds} />
            <TimerButton label={isActive ? 'PAUSE' : 'START'} onClick={toggleTimer} />
        </div>
    );
};

export default Pomodoro;
