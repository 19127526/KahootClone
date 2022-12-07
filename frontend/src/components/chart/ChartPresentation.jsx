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
    maintainAspectRatio: true,
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
            color: 'white'
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

const ChartPresentation = ({value, width}) => {
    console.log(value.text)
    // console.log(value.answers != undefined ? value.answers.length : 10000)
    // console.log(`answers ${value}`)
    const data = {
        labels: value.answers ?? [],
        datasets: [
            {
                data: [],
                backgroundColor: 'blue',
            },
        ]
    }
    return (
        <Space direction={"vertical"} align={"center"} size={"large"}  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width:"100%",
        }}>
            <Typography style={{fontSize: 25}}>
                {value.text}
                32132131
            </Typography>

            <Bar options={options} data={data}
                 style={{minWidth: width ?? "80vh"}}
            />
        </Space>
    );
}

export default ChartPresentation