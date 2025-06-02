import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";

import { dataVolume } from "./FakeData";

const PortChart = ({ liquidityData }) => {
  echarts.use([LineChart]);

  const timestampList = liquidityData.map((data, index) => (new Date(data.timestamp * 1000)).toLocaleString());
  const dataList = liquidityData.map((data, index) => data.liquidity);
  console.log(dataList);
  const dataVolume = [
    {
      type: "line",
      smooth: "true",
      emphasis: {
        focus: "series"
      },
      showSymbol: false,
      data: dataList,
      areaStyle: {
        color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#F3BA2F" },
                { offset: 0.05, color: "#F3BA2F" },
                { offset: 1, color: "#142028" }
              ])
      }
    },
  ];

  const optionBar = {
    // backgroundColor:"white",
    color: "#F3BA2F",
    tooltip: {
      padding: [16, 16, 8, 16],
      backgroundColor: "#121218",
      extraCssText:
        "pointer-events: all; overflow: auto; max-width: 400px;white-space: normal; boxShadow: 0px 4px 12px 0px rgba(0, 0, 0, .1);border-radius: 4px; max-height: 200px;",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, "PingFang SC", "Helvetica Neue",Helvetica, Arial, "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;'
      },
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      show: false
    },
    grid: {
      top: "25%",
      left: "0%",
      right: "0%",
      bottom: "5%",
      containLabel: true
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: 'white'
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#F3BA2F"
        }
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisTick: { show: false },
      axisLabel: {
        color: 'white'
      },
      data: timestampList
    },
    series: dataVolume
  };

  return (
    <div className="w-full right-0 top-0 h-96 rounded-2xl">
      <div className="">
        <ReactEChartsCore
          echarts={echarts}
          option={optionBar}
          style={{ height: 350 }}
        />
      </div>
    </div>
  );
};

export default PortChart;
