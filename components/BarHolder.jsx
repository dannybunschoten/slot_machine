import RollingBar from './RollingBar.jsx'
import React from "react";

export default function BarHolder() {
    return (
        <div className="inline-flex justify-center space-x-10 border-8 border-yellow-400 w-auto h-auto">
            <RollingBar />
            <RollingBar />
            <RollingBar />
            <RollingBar />
            <RollingBar />
        </div>
    );
}