import {
  BarChart,
  XAxis,
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
import { useMemo } from "react";
import { RechartsDevtools } from "@recharts/devtools";
import { buildGraphData } from "./graph.helpers";
import { PieDatum, Session } from "./graph.types";
import "./graph.css";

// Används för att räkna ut etikettposition i pajdiagrammet.
const RADIAN = Math.PI / 180;
// Färger per mood-nivå (1 = lägst, 5 = högst).
const COLORS: Record<number, string> = {
  1: "rgb(189, 58, 58)",
  2: "rgb(26, 68, 206)",
  3: "rgb(204, 113, 27)",
  4: "rgb(27, 94, 27)",
  5: "rgb(114, 212, 114)"
};

// Renderar procentetiketter inne i pajsegmenten.
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

// Sätter segmentfärg i pajdiagrammet utifrån mood-värdet i datapunkten.
const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector
    {...props}
    fill={COLORS[(props.payload as { mood?: number })?.mood ?? 0] ?? COLORS[0]}
  />
);

// Ren presentationskomponent för mood-fördelningen.
const PieChartWithCustomizedLabel = ({
  data,
  isAnimationActive = true
}: {
  data: PieDatum[];
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
    <Pie
      data={data}
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

// Huvudkomponent: bygger både stapeldata och pajdata från sessions.
const RangedStackedBarChart = ({
  sessions = [],
  isAnimationActive = true,
  defaultIndex
}: {
  sessions?: Session[];
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => {
  // useMemo för att undvika onödiga omräkningar vid rendering.
  const { pieData, rangedStackedBarData } = useMemo(
    () => buildGraphData(sessions),
    [sessions]
  );

  return (
    <>
      <p>Data: senaste 7 dagarna</p>
      <div className="graph-row">
        <div className="graph-wrapper">
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
            <Tooltip
              defaultIndex={defaultIndex}
              cursor={{ fill: "transparent" }}
              // Formaterar tooltip-värdet till heltalsminuter.
              formatter={(value, name) => [
                `${Math.round(Number(value ?? 0))} min`,
                String(name)
              ]}
              contentStyle={{
                background: "rgba(60, 60, 60, 0.7)",
                border: "1px solid rgba(200, 200, 200, 0.35)",
                boxShadow: "0 8px 18px rgba(0, 0, 0, 0.3)",
                borderRadius: "10px"
              }}
              itemStyle={{ color: "#f4f4f4", margin: "6px" }}
              labelStyle={{ color: "#f4f4f4" }}
            />
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
        <div className="graph-wrapper">
          <PieChartWithCustomizedLabel
            data={pieData}
            isAnimationActive={isAnimationActive}
          />
        </div>
      </div>
    </>
  );
};

export default RangedStackedBarChart;
