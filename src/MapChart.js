import React, { useEffect, useState, useMemo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import sortBy from "lodash/sortBy";
import features from './map/features.json';

const MapChart = () => {
    const [data, setData] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        csv("/data.csv").then((cities) => {
            const sortedCities = sortBy(cities, (o) => -o.population);
            setMaxValue(sortedCities[0].population);
            setData(sortedCities);
        });
    }, []);

    const popScale = useMemo(
        () => scaleLinear().domain([0, maxValue]).range([0, 24]),
        [maxValue]
    );

    return (
        <ComposableMap>
            <Geographies geography={features}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} fill="#41547C"/>
                    ))
                }
            </Geographies>

            {data.map(({ city_code, lng, lat, population }) => {
                console.log(data);
                return (
                    <Marker key={city_code} coordinates={[lng, lat]}>
                        <circle fill="#1476AA" stroke="#114958" r={popScale(population)} />
                    </Marker>
                );
            })}
        </ComposableMap>
    );
};

export default MapChart;
