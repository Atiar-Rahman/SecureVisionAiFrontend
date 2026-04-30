import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="glass-panel flex flex-col items-center rounded-[32px] px-10 py-12 text-center">
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
                <h1 className="mt-6 text-lg font-semibold text-slate-800 animate-pulse">
                    Loading Please Wait...
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Preparing your content
                </p>
            </div>
        </div>
    );
};

export default Loading;
