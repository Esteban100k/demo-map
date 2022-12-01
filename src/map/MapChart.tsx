import React, { useEffect, useState, useMemo, Fragment } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import sortBy from "lodash/sortBy";
import features from './features.json';
import dataCountry from './dataCountry.json';
import CircleMarker from './CircleMarker';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const MapChart = () => {
    const [data, setData] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        const sortedCities: any = sortBy(dataCountry, (o) => -o.population);
        setMaxValue(sortedCities[0].population);
        setData(sortedCities);
    }, []);

    const popScale = useMemo(() => scaleLinear().domain([0, maxValue]).range([0, 24]), [maxValue]);

    return (
        <Fragment>
            <div style={{ position:'relative', right:'50px' }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ComposableMap>
                        <Geographies geography={features}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography key={geo.rsmKey} geography={geo} fill="#41547C" />
                                ))
                            }
                        </Geographies>
                        {data.map(({ city_code, lng, lat, population, country }) => {
                            return (
                                <CircleMarker
                                    country={country}
                                    city_code={city_code}
                                    lng={lng}
                                    lat={lat}
                                    rValue={popScale(population)}
                                />
                            );
                        })}
                    </ComposableMap>
                </Grid>
                <Grid item xs={12} md={2}></Grid>
            </Grid>
            </div>
           
        </Fragment>
    );
};

export default MapChart;
