import React from 'react';
import {TimerButtonProps} from "../../types";

const TimerButton: React.FC<TimerButtonProps> = ({ label, onClick }) => (
    <button
        className="rounded-full px-8 border border-gray-400 bg-white py-2 font-bold"
        onClick={onClick}
    >
        {label}
    </button>
);

export default  TimerButton;