import React, { useEffect, useState } from 'react';
import { labelMapping } from '../Utils';

type FocusSelectionProps = {
    handleDataChange: (index: number, value: number) => void;
    index: number;
    reset: boolean;
};

const FocusSelection: React.FC<FocusSelectionProps> = ({ handleDataChange, index, reset }) => {
    // Define a key to save to localStorage based on the index to ensure each FocusSelection has a unique key
    const localStorageKey: string = `selectedLabel-${index}`;

    // Initialize state from localStorage or default to 0 if not found
    const [selectedLabel, setSelectedLabel] = useState<number>(
        () => JSON.parse(localStorage.getItem(localStorageKey) as string) || 0
    );

    // Whenever the selectedLabel changes, save it to localStorage
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedLabel));
    }, [selectedLabel, localStorageKey]);

    // Reset handler
    useEffect(() => {
        if (reset) {
            setSelectedLabel(0); // reset to initial value
            localStorage.removeItem(localStorageKey); // remove from localStorage as well
        }
    }, [reset, localStorageKey]);

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
