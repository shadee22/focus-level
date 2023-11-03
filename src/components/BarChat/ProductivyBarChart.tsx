import React, { useState, useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import FocusSelection from './FocusSelection';
import Legend from "../Legend";

type BarChartData = number[];

const generateInitialData = (hours: number) => Array(hours).fill(0);

const ProductivityBarChart: React.FC = () => {
    const chartRef: any = useRef(null);
    let myChart: Chart | null = null;
    const [hours, setHours] = useState<number>(10);
    const [data, setData] = useState<BarChartData>(generateInitialData(hours));
    const labels = Array.from({ length: hours }, (_, i) => (i + 1).toString());

    const handleDataChange = (index: number, value: number) => {
        const newData = [...data];
        newData[index] = value;
        setData(newData);
    };

    useEffect(() => {
        if (!chartRef.current) return;

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
                    labels: labels,
                    datasets: [{
                        label: '# of Hours',
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
    }, [data, hours]);

    return (
        <div className='max-w-80 max-h-80'>
            <canvas ref={chartRef} />
            <div className={`flex justify-between space-x-2 ml-8 mr-8 mt-2`}>
                {data.map((value, index) => (
                     <FocusSelection key={index} handleDataChange={handleDataChange} index={index} />
                ))}
            </div>
            <div>
                <div className="mb-4 flex mx-10 justify-between">
                    <Legend/>

                </div>
            </div>

        </div>
    );
}

export default ProductivityBarChart;