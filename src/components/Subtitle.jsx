import React from "react";

const Subtitle = ({ color,subtitle }) => {
    return (
        <h2 className={`text-2xl lg:text-3xl font-semibold text-${color}`}>{subtitle}</h2>
    )
}

export default Subtitle;