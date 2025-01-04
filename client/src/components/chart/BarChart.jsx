/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";

import { COLORS_TYPES } from "../../types";

const BarChart = ({ labels = [], data = [] }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
        },
    };

    return (
        <Bar
            data={{
                labels,
                datasets: data.map((d, i) => ({
                    data: d.data,
                    label: d.label || "Data",
                    backgroundColor: COLORS_TYPES[i],
                })),
            }}
            options={options}
        />
    );
};

export default BarChart;
