import React, { useEffect, useState, useMemo, Fragment } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import sortBy from "lodash/sortBy";
import features from './features.json';
import dataCountry from './dataCountry.json';
import CircleMarker from './CircleMarker';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stadistics from "./Stadistics";

const MapChart = () => {
    const [data, setData] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [zoomValue, setZoomValue] = useState(1);

    useEffect(() => {
        const sortedCities: any = sortBy(dataCountry, (o) => -o.population);
        setMaxValue(sortedCities[0].population);
        setData(sortedCities);
    }, []);

    const popScale = useMemo(() => scaleLinear().domain([0, maxValue]).range([0, 24]), [maxValue]);

    const inZoom = () => {
        let newValue = zoomValue + 1;
        setZoomValue(newValue);
    }

    const outZoom = () => {
        if (zoomValue > 1) {
            let newValue = zoomValue - 1;
            setZoomValue(newValue);
        }
    }

    return (
        <Fragment>
            <div style={{ position: 'relative' }}>

                {data.length > 0 ? <>
                    <Grid container spacing={5}>
                        <Grid item={true} xs={12} md={6}>
                            <ComposableMap>
                                <ZoomableGroup center={[0, 0]} zoom={zoomValue}>
                                    <Geographies geography={features} pointerEvents={"none"}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => (
                                                <Geography key={geo.rsmKey} geography={geo} fill="#41547C" />
                                            ))
                                        }
                                    </Geographies>
                                    {data.map(({ city_code, lng, lat, population, country, city }, index) => {
                                        return (
                                            <CircleMarker
                                                key={index}
                                                country={country}
                                                city_code={city_code}
                                                city={city}
                                                lng={lng}
                                                lat={lat}
                                                rValue={popScale(population)}
                                            />
                                        );
                                    })}
                                </ZoomableGroup>
                            </ComposableMap>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <Stadistics dataCountries={data} />
                        </Grid>

                    </Grid>
                </> : null}


            </div>

        </Fragment>
    );
};

export default MapChart;
