import React from "react";

const Slider = ()=>(
    <div className={`pt-8`}>
    <input
        className={`w-full h-2 bg-gray-600 accent-white rounded-lg appearance-none cursor-pointer `}
        type="range"
        min="8"
        max="12"
        // // value={hours}
        // // onChange={(e) => {
        // //     const newHours = Number(e.target.value);
        // //
        // //     setHours(Number(e.target.value))
        // //     setHours(newHours);
        // //     setData(generateInitialData(newHours));
        // {/*}}*/}
    />
    {/*<span className={`text-white font-semibold`}>Hours to Work: {hours}</span>*/}
</div>
)



export default Slider;