import {BarElement, CategoryScale, Chart, Chart as ChartJS, LinearScale, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Space, Typography} from "antd";
import {Bar} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetailSlide} from "../../../apis/slide/slideAPI";
import {reRenderChart} from "../Sider/ChartSider.actions";

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

const ChartPresentation = ({selectedValue, width}) => {
    // const reRender=useDispatch();
    // const [isLoading, setLoading] = useState(true)
    // console.log(selectedValue)
    let d = []
    let l = []
    const [dataChart, setData] = useState({labels: [], datasets: []})
    // console.log(value)
    // useEffect(() => {
    //
    //     if(value.votes !== null){
    //         setLoading(true)
    //         value.votes.forEach((index) => {
    //
    //             l.push(index.text)
    //             d.push(index.users === null ? 0 : index.users.length)
    //         })
    //         setData({
    //             labels: l,
    //             datasets: [{
    //                 data: d
    //             }]
    //         })
    //         reRender(reRenderChart())
    //         setLoading(false)
    //
    //     }
    // }, [value, slideList])

    useEffect(() => {
        if (selectedValue.votes === null) return;
        selectedValue.votes.forEach((index) => {

            l.push(index.text)
            d.push(index.voteCount)
        })
        setData({
            labels: l,
            datasets: [{
                data: d
            }]
        })
    }, [selectedValue])


    return (
        <Space direction={"vertical"} align={"center"} size={"large"} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
        }}>
            <Typography style={{fontSize: 25}}>
                {selectedValue.text}
            </Typography>

            {/*<div style={{minWidth: width ?? "80vh"}}>*/}
            {/*    {*/}
            {/*        selectedValue.votes.map((value) => {*/}
            {/*            return <div>*/}
            {/*                {*/}
            {/*                    value.id*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
            {/*{*/}
               <Bar options={options} data={
                    dataChart
                }
                    style={{minWidth: width ?? "80vh"}}/>
            {/*}*/}

        </Space>
    );
}

export default ChartPresentation