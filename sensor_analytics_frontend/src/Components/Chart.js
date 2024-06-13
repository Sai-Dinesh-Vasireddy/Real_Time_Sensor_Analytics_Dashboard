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

// Register Chart.js components
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

const WSS_FEED_URL = "ws://localhost:8080/topic?groupName=SLU&topicName=ECM";

const Chart = () => {
    const [useWebsocketData, setUseWebsocketData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'RPM',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    });

    const processMessages = (event) => {
      try{
        const parsedData = JSON.parse(event.data);
        const rpm = parsedData.rpm;
        
        const timestamp = new Date();
        if (rpm==null) {
          timestamp = null;
        }

        setUseWebsocketData((prevData) => {
          const updatedData = [...prevData, { rpm, timestamp }];
          updateChart(updatedData);
          return updatedData;
      });

        

      } catch (e) {
        console.log("Data is not in format of Json")
      }
      
      
        
    };

    

    const updateChart = (data) => {
        setChartData((prevData) => ({
            ...prevData,
            labels: data.map(item => item.timestamp),
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: data.map(item => item.rpm),
                },
            ],
        }));
    };

    useWebSocket(WSS_FEED_URL, {
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
                    text: 'RPM'
                }
            }
        }
    };

    return (
        <div>
            <h1 style={{color : "white"}}>Real-Time Machine RPM Chart</h1>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;