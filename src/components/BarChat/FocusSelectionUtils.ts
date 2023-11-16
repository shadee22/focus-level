// getClassNameUtils.tsx

export const getClassName = (labelValue: number, idx: number, arrayLength: number, selectedLabel: number) => {
    let className = `w-full h-12 flex items-center justify-center cursor-pointer 
                font-semibold transition-all duration-300 ease-in-out `;


    const isHighlighted = (value: number) => selectedLabel >= value;

    if (isHighlighted(labelValue)) {
        className += 'bg-white text-black ';
        if (labelValue === selectedLabel && labelValue !== 0) {
            className += 'rounded-t-xl  ';
        }
        if (labelValue === 0 && idx === arrayLength - 1) {
            className += 'rounded-b-2xl';
        }
    } else {
        className += 'bg-transparent text-gray-400 hover:text-white hover:text-black   ';
        if (idx === 0) {
            className += 'rounded-t-2xl ';
        } else if (idx === arrayLength - 1) {
            if (!isHighlighted(0)) { // Assuming 'none' maps to 0 in labelMapping
                className += 'rounded-2xl';
            }
        }
    }

    if (labelValue !== 0 && labelValue !== selectedLabel) {
        className = className.replace('border-2 ', '');
        className = className.replace('rounded-2xl', '');
    }

    return className;
};
