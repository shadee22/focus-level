import { useEffect } from 'react';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip} from 'chart.js';
import {getColorForBar} from "../Utils";
import {chartOptions} from "./chartOptions";

const useChart = (chartRef: any, data: any, hoursLabels: any, hours: any) => {
    let myChart: Chart | null = null;
    useEffect(() => {
        if (!chartRef.current) return;

        Chart.register(
            BarController,
            CategoryScale,
            LinearScale,
            BarElement,
            Tooltip
        );

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (myChart) {
                myChart.destroy();
                myChart = null;
            }

            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: hoursLabels,
                    datasets: [{
                        label: ' Focus',
                        data: data,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderSkipped: false,
                        backgroundColor: data.map((value: number) => getColorForBar(value)),
                    }]
                },
                options: chartOptions
            });
        }

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        }
    }, [data, hours, hoursLabels]);
}

export default useChart;
