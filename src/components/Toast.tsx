import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded">
            {message}
        </div>
    );
}

export default Toast;
