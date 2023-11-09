import React, {useEffect, useRef, useState} from 'react';


import FocusSelection from './FocusSelection';
import Legend from "../Legend";
import useChart from "./useChart";
import Toast from "../../components/Toast";
import {useSoundEffects} from "../BarChat/PlaySound";
import Pomodoro from "../../components/Pomodoro";
import {convertTo12HourFormat} from "../../components/Utils";

type BarChartData = number[];

const generateInitialData = (hours: number) => Array(hours).fill(0);

const ProductivityBarChart: React.FC = () => {

    const loadState = (key: any, defaultValue: any) => {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    };

    const chartRef = useRef<any>(null);
    const [hours] = useState<number>(loadState('hours', 10));
    const [data, setData] = useState<BarChartData>(loadState('data', generateInitialData(hours)));
    const [hoursLabels, setHoursLabels] = useState<number[]>(loadState('hoursLabels', generateInitialData(hours)));
    const [showToast, setShowToast] = useState(loadState('showToast', false));
    const [sessionStartHour, setSessionStartHour] = useState<number | null>(loadState('sessionStartHour', null));
    const [sessionStatus, setSessionStatus] = useState(loadState('sessionStatus', false));


    useEffect(() => {
        localStorage.setItem('hours', JSON.stringify(hours));
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('hoursLabels', JSON.stringify(hoursLabels));
        localStorage.setItem('showToast', JSON.stringify(showToast));
        localStorage.setItem('sessionStartHour', JSON.stringify(sessionStartHour));
        localStorage.setItem('sessionStatus', JSON.stringify(sessionStatus));
    }, [hours, data, hoursLabels, showToast, sessionStartHour, sessionStatus]);


    useEffect(() => {
        const interval = setInterval(() => {
            const currentHour = new Date().getHours();
            setSessionStartHour(currentHour);
        }, 500);

        return () => clearInterval(interval);
    }, [sessionStartHour]);


    const playSound = () => {
        // Define an array of audio file paths
        const audioFiles = ['/zte_ripple.mp3', '/lil_hi.mp3', '/oye_girl_voice.mp3'];

        // Get a random index within the range of audioFiles array
        const randomIndex = Math.floor(Math.random() * audioFiles.length);

        // Create an Audio object with the selected audio file
        const audio = new Audio(audioFiles[randomIndex]);

        // Play the selected audio
        audio.play();
    };
    useEffect(() => {
        const checkHourly = () => {
            const currentMinute = new Date().getMinutes();
            if (currentMinute === 0 && sessionStatus) {
                playSound();
            }
        }

        const hourlySoundInterval = setInterval(checkHourly, 60 * 1000);

        return () => clearInterval(hourlySoundInterval);
    }, []);


    const handleStart = () => {
        const currentHour = new Date().getHours();
        setSessionStartHour(currentHour)
        // const newLabels = Array.from({length: 10}, (_, idx) => (currentHour + idx) % 24);
        // Create an array of 12-hour time labels
        // Create an array of 12-hour time labels as numbers
        const newLabels = Array.from({ length: 10 }, (_, idx) => {
            const hour24 = (currentHour + idx) % 24;
            return hour24 === 0 ? 12 : hour24 <= 12 ? hour24 : hour24 - 12; // Convert the hour to a number
        });
        setHoursLabels(newLabels);
        playSound();
        setShowToast(true);
        setSessionStatus(true)
        setTimeout(()=>{
            setShowToast(false)
        },4000)
    };

    const handleStop = ()=> {
        setSessionStatus(false)
        setData(generateInitialData(hours));  // Reset the data to its initial value

    }
    const handleDataChange = (index: number, value: number) => {
        const newData = [...data];
        newData[index] = value;
        setData(newData);
    };

    useSoundEffects(sessionStatus)
    useChart(chartRef, data,  hoursLabels, hours)

    const renderSessionButton = () => {
        if (!sessionStatus) {
            return (
                <button
                    className={`h-fit p-4 text-lg
                    bg-gradient-to-b from-white/40 text-white  to-white/20
                     py-2 rounded-xl  font-bold  font-thin hover:outline outline-gray-800  transition-all`}
                    onClick={handleStart}
                >
                    Start Session Now
                </button>
            );
        } else {
            let convertedTime = convertTo12HourFormat(sessionStartHour+":00")

            return (
                <button
                    className={` h-fit p-4 text-lg
                    bg-gradient-to-b from-white/40 text-white  to-white/20
                     py-2 rounded-xl  font-bold  font-thin hover:outline outline-gray-800  transition-all`}
                    onClick={handleStop}
                >
                    <p className={`font-light`}>
                        Stop Session of

                        <span className={`font-medium`}>{" "}{convertedTime.time}{" "}{convertedTime.am_pm}</span>
                    </p>
                </button>
            );
        }
    };

    return (
        <div className='max-w-80 max-h-80'>
            {showToast && <Toast message={`Session Started at ${sessionStartHour}`} />}
            <div className={`flex justify-between mb-8 items-center `}>
                <h1 className="text-3xl   font-bold text-white">
                    Focus Level
                </h1>
                {renderSessionButton()}
            </div>
            <canvas className={`text-white`} ref={chartRef}/>
            <div className={`flex justify-between space-x-2 ml-8 mr-8 mt-2`}>
                {data.map((value, index) => (
                    <FocusSelection key={index} handleDataChange={handleDataChange} index={index} reset={!sessionStatus}/>
                ))}

            </div >
            <div className="mb-4 flex mx-10 ">
                <Legend/>
                <Pomodoro/>
            </div>
        </div>
    );
};

export default ProductivityBarChart;
