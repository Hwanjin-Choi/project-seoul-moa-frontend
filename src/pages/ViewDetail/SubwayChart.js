import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";

const ChartBox = styled.div`
  width: 100%;
  height: 130px;
  margin: 15px 0;
  @media (min-width: 768px) {
    height: 200px;
  }

  @media (min-width: 1024px) {
    height: 300px;
  }
`;

const Tag = styled.span`
  display: inline-block;
  background-color: ${Color.MC1};
  color: white;
  padding: 2px 10px;
  border-radius: 10px;
`;

const SubwayChart = ({ data, currentHour, subwayName, subwayLine, state }) => {
  console.log(data, "sub");
  return (
    <>
      <ChartBox>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="time"
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fontSize="10"
                  fill={Color.BC3}
                >
                  {payload.value}
                </text>
              )}
            />
            <Tooltip />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>

      <Typography
        variant="h6"
        style={{ textAlign: "center", marginBottom: 10 }}
      >
        {currentHour}시의 {subwayName}({subwayLine})은 <Tag>{state}</Tag>{" "}
        단계입니다
      </Typography>
    </>
  );
};

export default SubwayChart;
