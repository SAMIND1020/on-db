/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";

import { COLORS_TYPES } from "../../types";

const LineChart = ({ data = [], title = "" }) => {
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
    };
    return (
        <Line
            data={{
                labels: data.map((d) => d.label),
                datasets: [
                    {
                        label: title,
                        data: data.map((d) => d.data),
                        backgroundColor: COLORS_TYPES[0],
                    },
                ],
            }}
            options={options}
        />
    );
};

export default LineChart;
