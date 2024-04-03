import Chart from "react-apexcharts";

const LineChart = ({ initWidth, data }) => {
    const state = {
        options: {
            chart: {
                id: "basic-bar",
                type: 'line',
                parentHeightOffset: 0 // important to adjust height dynamically
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
                    enabled: true,
                    opacityFrom: 0.55,
                    opacityTo: 0
                }
            },

        },
        series: [
            {
                type: 'area',
                name: "Total Booked",
                data: Object.values(data),
                fontSize: '5px',
                fontWeight: 300,
            }
        ]
    }

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width={initWidth}
                    />
                </div>
            </div>
        </div>
    );
}

export default LineChart;