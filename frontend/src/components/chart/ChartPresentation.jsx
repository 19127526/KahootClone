import {BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Space, Typography} from "antd";
import {Bar} from "react-chartjs-2";
import React from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartDataLabels
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
        datalabels: {
            display: true,
            color: 'black'
        }
    },

    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            display: false,
            grid: {
                display: false
            },
            ticks: {
                display: false
            },
        }
    }
};

const ChartPresentation = ({item}) => {
    return (
        <Space direction={"vertical"} align={"center"} size={"large"}  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width:"100%",
        }}>
            <Typography style={{fontSize: 25}}>
                {item.question == "" ? "Your question" : item.question}
            </Typography>

            <Bar options={options} data={item.content}
                 style={{minWidth: "80vh"}}
            />
        </Space>
    );
}

export default ChartPresentation