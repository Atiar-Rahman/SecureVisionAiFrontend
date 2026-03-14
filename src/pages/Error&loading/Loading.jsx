import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-lg">

                <CirclesWithBar
                    height="100"
                    width="100"
                    color="#22c55e"
                    outerCircleColor="#22c55e"
                    innerCircleColor="#16a34a"
                    barColor="#15803d"
                    ariaLabel="circles-with-bar-loading"
                    visible={true}
                />

                <h1 className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
                    Loading Please Wait...
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Preparing your content
                </p>

            </div>

        </div>
    );
};

export default Loading;