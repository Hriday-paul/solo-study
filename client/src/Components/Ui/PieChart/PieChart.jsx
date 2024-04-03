import Chart from "react-apexcharts";

const PieChart = ({datalist}) => {
    const state = {
        series: datalist,
        options: {
            labels: ['Study time', 'Break time', 'Others'],
            chart: {
                type: 'donut'
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
                            width: '200px'
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
        }
    };

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="donut"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default PieChart;
