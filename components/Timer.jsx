"use client";

import React, { useEffect } from "react";

export default function Timer() {

    useEffect(() => {
        const timer = setInterval(() => {
       console.log("Running........");
        }, 1000);

        return () => {
        clearInterval(timer);
        console.log("Timer cleared");
        }
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold">Timer</h1>
        </div>
    );
}