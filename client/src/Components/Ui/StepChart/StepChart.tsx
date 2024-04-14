import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StepChart = ({ initWidth, data } : {initWidth : number; data : {[key : string] : number}}) => {
    const options : ApexOptions = {
            chart: {
                id: "basic-bar",
                type: 'line',
                parentHeightOffset: 0 // important to adjust height dynamically
            },
            xaxis: {
                categories: ['5th', '4th', '3rd', '2nd', 'today'],
                labels: {
                    style: {
                        colors: ['#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB',],
                        fontSize: '10px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 300,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB',],
                        fontSize: '8px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 300,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            colors: ["#2bc6ff"],
            stroke: {
                width: 3,
                colors: ['#00a0db']
            },
            fill: {
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0
                }
            },

        }

    const serries = [
        {
            type: 'area',
            name: "Study history",
            data: Object.values(data),
            fontSize: '5px',
            fontWeight: 300,
        }
    ]

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={serries}
                        type="bar"
                        width={initWidth}
                    />
                </div>
            </div>
        </div>
    );
}

export default StepChart;