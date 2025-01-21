/* eslint-disable react/prop-types */
import BarChart from "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";

import {
    getUserCountByLastMonths,
    getLastMonthVariation,
    getMostRecentItem,
} from "../../helpers";

const StatsModal = ({ groups, people, events }) => {
    return (
        <>
            <div className="px-12 py-2">
                <p className="mt-2 font-semibold text-xl text-text dark:text-text-dark">
                    Stats
                </p>
                <div className="flex gap-4 py-2">
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border border-selected dark:border-selected-dark">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Total People
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {people.length}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border border-selected dark:border-selected-dark">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            New People (Last 30 Days)
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {getLastMonthVariation(people)}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border border-selected dark:border-selected-dark">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Last Person Added
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {getMostRecentItem(
                                people,
                                "created_at"
                            )?.name.split(" ")[0] || "Loading..."}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border border-selected dark:border-selected-dark">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Total Events
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {events.length}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="rounded-xl h-44 w-full border border-selected dark:border-selected-dark">
                        <BarChart
                            data={groups.map((g) => ({
                                data: [g.events.length],
                                label: g.name,
                            }))}
                            labels={["Events Per Group"]}
                        />
                    </div>
                    <div className="rounded-xl h-44 w-full border border-selected dark:border-selected-dark">
                        <BarChart
                            data={groups.map((g) => ({
                                data: [g.members.length],
                                label: g.name,
                            }))}
                            labels={["People Per Group"]}
                        />
                    </div>
                    <div className="rounded-xl h-44 w-full border border-selected dark:border-selected-dark">
                        <LineChart
                            data={getUserCountByLastMonths(people).map((g) => ({
                                data: g.value,
                                label: g.month,
                            }))}
                            title="People Per Mounth"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatsModal;
