"use client";
import React from "react";
import CountUp from "react-countup";

type Props = {
  used: number;
  total: number;
};

const Chart = ({ used, total }: Props) => {
  const usedGB = parseFloat((used / 1024 ** 3).toFixed(1));
  const totalGB = parseFloat((total / 1024 ** 3).toFixed(1));
  const percent = (used / total) * 100;

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-3 p-6 rounded-xl bg-[#1b1b24] shadow-md shadow-[#9a6efe] w-fit">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#333"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#9a6efe"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize="14px"
        >
          {usedGB} / {totalGB} GB
        </text>
      </svg>
      <p className="text-lg text-gray-400 font-medium flex items-center gap-2">
        <span>Used Space:</span>
        <CountUp end={percent} decimals={1} duration={2} suffix="%" />
      </p>
    </div>
  );
};

export default Chart;
