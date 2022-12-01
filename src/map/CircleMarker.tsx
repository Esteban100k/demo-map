import React, { Fragment, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import { Marker } from "react-simple-maps";
import './CircleMarker.css';

const MapChart = ({ country, city_code, lng, lat, rValue }: any) => {

    const [changeColor, setChangeColor] = useState(false);
    
    return (
        <Fragment>
            <Tooltip title={country}>
                <Marker key={city_code} coordinates={[lng, lat]}>
                    <circle
                        className={changeColor == true ? "animated flash" : ""}
                        fill={changeColor == true ? '#000000' : "#4782da"}
                        stroke="#fff"
                        fill-opacity="1"
                        stroke-width="7"
                        r={rValue}
                        stroke-opacity="0.4"
                        cursor="pointer"
                        onMouseOver={() => {setChangeColor(true)}}
                        onMouseOut={() => {setChangeColor(false)}}
                    />
                </Marker>
            </Tooltip>
        </Fragment>
    );
};

export default MapChart;
