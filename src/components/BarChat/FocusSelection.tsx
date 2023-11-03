import React, { useState } from 'react';
import { labelMapping } from '../Utils';

type FocusSelectionProps = {
    handleDataChange: (index: number, value: number) => void;
    index: number;
};

const FocusSelection: React.FC<FocusSelectionProps> = ({ handleDataChange, index }) => {
    const [selectedLabel, setSelectedLabel] = useState(0);

    const handleSelectionChange = (index: number, value: number) => {


        setSelectedLabel(value);
        handleDataChange(index, value);
    };

    return (
            <main className={`grid space-y-2 w-full`}>
                {['high', 'medium', 'low', 'none'].map((label: string, idx: number) => (
                    <div
                        key={idx}
                        onClick={() => handleSelectionChange(index, labelMapping[label])}
                        onDoubleClick={() => handleSelectionChange(index, labelMapping['none'])}
                        className={`w-full h-10 flex items-center justify-center  cursor-pointer font-semibold transition-all rounded-2xl
                         ${selectedLabel === labelMapping[label] ? 'bg-white text-black ' : 'bg-white/20 hover:bg-white/70'}`}
                    >
                        {`${labelMapping[label]}`}
                    </div>
                ))}
            </main>
    );
};

export default FocusSelection;
