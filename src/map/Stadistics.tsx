import React, { Fragment, useEffect } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import flags from './flags.json';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Stadistics = ({ dataCountries }: any) => {

    const options = {
        indexAxis: 'y' as const,
        color: 'white',
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: 'white', beginAtZero: true, callback: function (value: any, index: any, ticks: any) {
                        return getStringFlag(dataCountries[index].country) + " " + dataCountries[index].country + " - " + dataCountries[index].city;
                    }
                }
            },
            x: {
                ticks: { color: 'white', beginAtZero: true }
            }
        }
    };

    const getStringFlag = (countryName: string) => {
        let flagUnicode = flags.find((fl) => fl.name.toString() == countryName.toString());
        return flagUnicode?.emoji;
    }

    const labels = dataCountries.map((item: any) => item.country + " - " + item.city);

    const data = {
        labels,
        datasets: [
            {
                label: 'Nodes',
                data: dataCountries.map((item: any) => item.population),
                backgroundColor: '#41547C',
                borderColor: 'white'
            }
        ],
    };

    useEffect(() => {
        console.log("dataCountries", dataCountries);
    }, []);

    return (
        <Fragment>
            <Bar options={options} data={data} />
        </Fragment>
    );
};

export default Stadistics;
