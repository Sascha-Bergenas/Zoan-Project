import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarStack,
  TooltipIndex,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const rangedStackedBarData = [
  {
    name: "Mon",
    value1: 400,
    value2: 300,
    value3: 200,
  },
  {
    name: "Tue",
    value1: 300,
    value2: 200,
    value3: 221,
  },
  {
    name: "Wed",
    value1: 200,
    value2: 1398,
    value3: 229,
  },
  {
    name: "Thu",
    value1: 278,
    value2: 390,
    value3: 200,
  },
  {
    name: "Fri",
    value1: 189,
    value2: 480,
    value3: 218,
  },
  {
    name: "Sat",
    value1: 239,
    value2: 380,
    value3: 250,
  },
  {
    name: "Sun",
    value1: 349,
    value2: 430,
    value3: 210,
  },
];

const RangedStackedBarChart = ({
  isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => (
  <BarChart
    style={{
      width: "100%",
      maxWidth: "700px",
      maxHeight: "70vh",
      aspectRatio: 1.618,
    }}
    responsive
    data={rangedStackedBarData}
    id="recharts-ranged-stacked-bar-chart"
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip defaultIndex={defaultIndex} />
    <BarStack radius={25}>
      <Bar
        dataKey="value1"
        maxBarSize={50}
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
        activeBar={{ fill: "#5550bd" }}
      />
      <Bar
        dataKey="value2"
        maxBarSize={50}
        fill="#82ca9d"
        isAnimationActive={isAnimationActive}
        activeBar={{ fill: "#55bd50" }}
      />
      <Bar
        dataKey="value3"
        maxBarSize={50}
        fill="#ffc658"
        isAnimationActive={isAnimationActive}
        activeBar={{ fill: "#ffc658" }}
      />
    </BarStack>
    <RechartsDevtools />
  </BarChart>
);

export default RangedStackedBarChart;
