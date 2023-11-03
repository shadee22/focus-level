import React, { useState, useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import FocusSelection from './FocusSelection';
import Legend from "../Legend";

type BarChartData = number[];

const initialData: BarChartData = [0, 0, 0, 0, 0, 0, 0, 0];

const ProductivityBarChart: React.FC = () => {
    const chartRef: any = useRef(null);
    let myChart: Chart | null = null; // Reference to the created chart
    const [data, setData] = useState<BarChartData>(initialData);
    const [selectedLabel, setSelectedLabel] = useState<number>(0);

    const handleDataChange = (index: number, value: number) => {
        const newData = [...data];
        newData[index] = value;
        setData(newData);
        setSelectedLabel(value);
    };


    useEffect(() => {
        if (!chartRef.current) return;


        // Register the required elements, controllers, and scales
        Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            // If a chart already exists, destroy it
            if (myChart) {
                myChart.destroy();
                myChart = null;
            }

            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','as','asa'],
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderSkipped: false,
                        backgroundColor: ["white", "white", "white", "white", "white", "white"],
                    }]
                },

                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                            max: 3

                        }
                    },
                    interaction: {
                        mode: 'index',
                    },
                    plugins: {
                        title: {
                            display: true,
                        }
                    }
                }
            });
        }

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        }
    }, [data]);

    return (
        <div className='max-w-80 max-h-80'>
            <canvas ref={chartRef} />
            <div className={`flex space-x-7 ml-12 mt-2`}>
                {data.map((value, index) => (
                    <FocusSelection key={index} handleDataChange={handleDataChange} index={index} />
                ))}
            </div>
            <Legend/>
        </div>
    );
}

export default ProductivityBarChart;