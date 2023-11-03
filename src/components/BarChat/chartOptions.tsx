export const chartOptions: any = {
    responsive: true,
    scales: {
        y: {
            title: {
                display: true,
                text: 'Focus Scale',
                color: 'white'
            },
            type: 'linear',
            beginAtZero: true,
            max: 3,
            ticks: {
                color: 'white'  // color for the y-axis labels
            }
        },
        x: {
            title: {
                display: true,
                text: 'Hours',
                color: 'white'
            }
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
};
