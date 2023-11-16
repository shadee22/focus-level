// Define the props for TimerDisplay component
export interface TimerDisplayProps {
    minutes: number;
    seconds: number;
}

// Define the props for TimerButton component
export interface TimerButtonProps {
    label: string;
    onClick: () => void;
}
export type FocusSelectionProps = {
    handleDataChange: (index: number, value: number) => void;
    index: number;
    reset: boolean;
};
