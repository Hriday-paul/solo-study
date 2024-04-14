import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const LineChart = ({ initWidth, data }: { initWidth: number; data: { [key: string]: number } }) => {
    const options: ApexOptions = {
        chart: {
            id: "basic-bar",
            type: 'line',
            parentHeightOffset: 0,
            zoom: {
                enabled: true
            }, // important to adjust height dynamically
        },
        xaxis: {
            categories: Object.keys(data),
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
                    fontSize: '13px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 300,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    chart: {
                        width: '320px'
                    }
                }
            },
            {
                breakpoint: 1023,
                options: {
                    chart: {
                        width: '100px'
                    }
                }
            },
            {
                breakpoint: 1281,
                options: {
                    chart: {
                        width: '300px'
                    }
                }
            },
            {
                breakpoint: 1536,
                options: {
                    chart: {
                        width: '320px'
                    }
                }
            }
        ],
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
            name: "Total Booked",
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

export default LineChart;