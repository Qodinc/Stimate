import React from "react";

const Title = ({ color, title}) => {
    return (
        <h1 className={`text-xl md:text-2xl lg:text-4xl text-${color}`}>{title}</h1>
    )
} 

export default Title