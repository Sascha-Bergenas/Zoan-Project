import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarStack,
  TooltipIndex,
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import "./graph.css";

// Hjälper för att räkna vinklar i radianer.
const RADIAN = Math.PI / 180;
// Färger som matchar moods
const COLORS = [
  " rgb(114, 212, 114)",
  "rgb(27, 94, 27)",
  " rgb(204, 113, 27)",
  " rgb(26, 68, 206)"
];

// Mockdata för pajdiagrammet.
const pieData = [
  { name: "Happy", value: 400 },
  { name: "Fine", value: 300 },
  { name: "Meh", value: 300 },
  { name: "Bad", value: 200 }
];

// Mockdata för staplade staplar per veckodag.
const rangedStackedBarData = [
  {
    name: "Mon",
    work: 400,
    study: 300,
    meeting: 200
  },
  {
    name: "Tue",
    work: 300,
    study: 200,
    meeting: 221
  },
  {
    name: "Wed",
    work: 200,
    study: 1398,
    meeting: 229
  },
  {
    name: "Thu",
    work: 278,
    study: 390,
    meeting: 200
  },
  {
    name: "Fri",
    work: 189,
    study: 480,
    meeting: 218
  },
  {
    name: "Sat",
    work: 239,
    study: 380,
    meeting: 250
  },
  {
    name: "Sun",
    work: 349,
    study: 430,
    meeting: 210
  }
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

// Färgar varje pajsegment baserat på index.
const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
);

// Pajdiagram med egna etiketter och hover-effekter.
const PieChartWithCustomizedLabel = ({
  isAnimationActive = true
}: {
  isAnimationActive?: boolean;
}) => (
  <PieChart
    style={{
      width: "100%",
      maxWidth: "32rem",
      maxHeight: "60vh",
      aspectRatio: 1
    }}
    responsive
  >
    {/* Etiketter renderas via renderCustomizedLabel */}
    <Pie
      data={pieData}
      labelLine={false}
      label={renderCustomizedLabel}
      fill="#8884d8"
      dataKey="value"
      isAnimationActive={isAnimationActive}
      shape={MyCustomPie}
    />
    <RechartsDevtools />
  </PieChart>
);

// Layout för två grafer sida vid sida.
const RangedStackedBarChart = ({
  isAnimationActive = true,
  defaultIndex
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => (
  <div className="graph-row">
    <div className="graph-wrapper">
      <PieChartWithCustomizedLabel isAnimationActive={isAnimationActive} />
    </div>
    <div className="graph-wrapper">
      {/* Stapeldiagrammet använder mockdata per veckodag */}
      <BarChart
        style={{
          width: "100%",
          maxWidth: "60rem",
          maxHeight: "60vh",
          aspectRatio: 1.618
        }}
        responsive
        data={rangedStackedBarData}
        id="recharts-ranged-stacked-bar-chart-2"
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        {/* Tooltip-stil som passar den mörka bakgrunden. */}
        <Tooltip
          defaultIndex={defaultIndex}
          cursor={{ fill: "transparent" }}
          contentStyle={{
            background: "rgba(60, 60, 60, 0.7)",
            border: "1px solid rgba(200, 200, 200, 0.35)",
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px"
          }}
          itemStyle={{ color: "#f4f4f4", margin: "6px" }}
          labelStyle={{ color: "#f4f4f4" }}
        />
        {/* Staplarna är staplade och får rundade hörn */}
        <BarStack radius={25}>
          <Bar
            dataKey="work"
            maxBarSize={50}
            fill=" rgb(126, 164, 214)"
            isAnimationActive={isAnimationActive}
            activeBar={{ fill: "rgb(88, 120, 182)" }}
          />
          <Bar
            dataKey="study"
            maxBarSize={50}
            fill="rgb(170, 140, 220)"
            isAnimationActive={isAnimationActive}
            activeBar={{ fill: "rgb(130, 100, 190)" }}
          />
          <Bar
            dataKey="meeting"
            maxBarSize={50}
            fill="rgb(172, 171, 231)"
            isAnimationActive={isAnimationActive}
            activeBar={{ fill: "rgb(112, 93, 221)" }}
          />
        </BarStack>
        <RechartsDevtools />
      </BarChart>
    </div>
  </div>
);

export default RangedStackedBarChart;
