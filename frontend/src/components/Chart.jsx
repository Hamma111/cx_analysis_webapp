import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

export const options = {
    title: {display: true, text: 'My Chart'},
    legend: {
        text: 'pak'
    },
    plugins: {
        legend: {
            text: 'pak'
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true, // SET SCROOL ZOOM TO TRUE
                    speed: 0.1
                },
                mode: "x",
                speed: 0.1,
            },
            pan: {
                enabled: true,
                mode: "x",
                speed: 0.1,
            }
        }
    },
    transitions: {
        zoom: {
            animation: {
                duration: 1,
                easing: 'easeInCirc'
            }
        }
    },
}


export function Chart({labels, data}) {
    const chartRef = React.useRef(null);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };
    const chartData = {
        labels,
        datasets: [
            {
                data: data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1.5,
                radius: 0,

            }
        ],
    };
    return (
        <div>
            <br></br>
            <br></br>
            <button onClick={handleResetZoom}>reset zoom</button>
            <Line ref={chartRef} options={options} data={chartData}/>
        </div>
    )

}