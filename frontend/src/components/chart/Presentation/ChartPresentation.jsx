import {BarElement, CategoryScale, Chart, Chart as ChartJS, LinearScale, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Space, Typography} from "antd";
import {Bar} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

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

const ChartPresentation = ({value, width, slideList}) => {
    let d = []
    let l = []
<<<<<<< Updated upstream:frontend/src/components/chart/Presentation/ChartPresentation.jsx

    const data=useSelector(state=>state.chartSiderRoutes);
    const [dataChart, setData] = useState({labels: [], datasets: []})
=======
>>>>>>> Stashed changes:frontend/src/components/chart/ChartPresentation.jsx

    const [dataChart, setData] = useState({labels: [], datasets: []})
    useEffect(() => {
        if(value.answers !== undefined){
            value.answers.forEach((index) => {

                l.push(index.text)
                d.push(index.userAnswers === null ? 0 : index.userAnswers.length)
            })
            setData({
                labels: l,
                datasets: [{
                    data: d
                }]
            })
        }
<<<<<<< Updated upstream:frontend/src/components/chart/Presentation/ChartPresentation.jsx

    }, [value])
=======
    }, [value, slideList])
>>>>>>> Stashed changes:frontend/src/components/chart/ChartPresentation.jsx





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
          </Typography>

          {
              <Bar options={options} data={
                  dataChart
              }
                   style={{minWidth: width ?? "80vh"}}
              />
          }

      </Space>
    );
}

export default ChartPresentation