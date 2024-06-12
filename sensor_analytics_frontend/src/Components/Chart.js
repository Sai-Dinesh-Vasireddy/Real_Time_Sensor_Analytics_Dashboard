import { useState, useEffect, useRef } from "react";
import { Line } from 'react-chartjs-2';
import useWebSocket from 'react-use-websocket';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const Chart = ({ groupName, topicName }) => {
    const [useWebsocketData, setUseWebsocketData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const processMessages = (event) => {
        try {
            const parsedData = JSON.parse(event.data);
            const timestamp = new Date();

            setUseWebsocketData((prevData) => {
                const updatedData = [...prevData, { ...parsedData, timestamp }];
                updateChart(updatedData);
                return updatedData;
            });
        } catch (e) {
            console.log("Data is not in format of Json");
        }
    };

    const updateChart = (data) => {
        const datasetNames = Object.keys(data[0]).filter(key => key !== 'timestamp');

        setChartData({
            labels: data.map(item => item.timestamp),
            datasets: datasetNames.map(name => ({
                label: name,
                data: data.map(item => item[name]),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            })),
        });
    };

    const { lastJsonMessage } = useWebSocket(`ws://localhost:8080/topic?groupName=${groupName}&topicName=${topicName}`, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000,
        reconnectAttempts: 1,
        onMessage: processMessages,
    });

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second',
                    tooltipFormat: 'HH:mm:ss',
                    displayFormats: {
                        second: 'HH:mm:ss'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Values'
                }
            }
        }
    };

    return (
        <div>
            <h1 style={{color : "white"}}>Real-Time Machine Data Chart</h1>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;