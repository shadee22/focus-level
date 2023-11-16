import React, { useEffect, useState } from 'react';
import { labelMapping } from '../Utils';
import {getClassName} from "./FocusSelectionUtils";

type FocusSelectionProps = {
    handleDataChange: (index: number, value: number) => void;
    index: number;
    reset: boolean;
};

const FocusSelection: React.FC<FocusSelectionProps> = ({ handleDataChange, index, reset }) => {
    const localStorageKey: string = `selectedLabel-${index}`;
    const [selectedLabel, setSelectedLabel] = useState<number>(
        () => JSON.parse(localStorage.getItem(localStorageKey) as string) || 0
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedLabel));
    }, [selectedLabel, localStorageKey]);

    useEffect(() => {
        if (reset) {
            setSelectedLabel(0);
            localStorage.removeItem(localStorageKey);
        }
    }, [reset, localStorageKey]);

    const handleSelectionChange = (index: number, value: number) => {
        setSelectedLabel(value);
        handleDataChange(index, value);
    };


    const labels = ['high', 'medium', 'low', 'none'];

    return (
        <main className={`grid w-full`}>
            {labels.map((label: string, idx: number) => (
                <div
                    key={idx}
                    onClick={() => handleSelectionChange(index, labelMapping[label])}
                    onDoubleClick={() => handleSelectionChange(index, labelMapping['none'])}
                    className={getClassName(labelMapping[label], idx, labels.length, selectedLabel)}
                >
                    {`${labelMapping[label]}`}
                </div>
            ))}
        </main>
    );
};

export default FocusSelection;
