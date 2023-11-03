
export const labelMapping: { [label: string]: number } = {
    'none': 0,
    'low': 1,
    'medium': 2,
    'high': 3
};

export const reverseLabelsMapping: { [label: number]: string } = {
    0: 'No Focus',
    1: 'Low Focus',
    2: 'Medium Focus',
    3: 'High Focus '
};

export  const getColorForBar = (value: number): string => {
    switch(value) {
        case 3:
            return "white";
        case 2:
            return "slategray";

        case 1:
            return "gray";
        default:
            return "transparent"; // default color in case of unexpected values
    }
};