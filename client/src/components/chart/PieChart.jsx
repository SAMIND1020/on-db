/* eslint-disable react/prop-types */
import { Pie } from "react-chartjs-2";

import { COLORS_TYPES } from "../../types/";

const PieChart = ({ data = [] }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        return ` ${value} votes`;
                    },
                },
            },
        },
    };

    return (
        <Pie
            data={{
                labels:  data.map((d) => d.label),
                datasets: [
                    {
                        data: data.map((d) => d.data),
                        backgroundColor: COLORS_TYPES,
                    },
                ],
            }}
            options={options}
        />
    );
};

export default PieChart;
