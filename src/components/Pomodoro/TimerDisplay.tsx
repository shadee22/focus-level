import React from 'react';
import {TimerDisplayProps} from "../../types";

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => (
    <div className="text-6xl font-semibold text-white mb-4">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
);
