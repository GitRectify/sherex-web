import { Route, Routes } from "react-router-dom";

import Home from "../pages";
import Liquidity from "../pages/liquidity/index.js";
import PageNotFound from "../pages/notfound";
import MainLayout from "../layout/MainLayout";
import { PrivateRoute, GeneralRoute } from "./PrivateRoute";
import LiquidityView from "../pages/liquidity/view/index.js";
import Tokens from "../pages/tokens/index.js";
import Staking from "../pages/staking/index.js";
import TokenView from "../pages/tokens/view/index.js";
import LiquidityPool from "../pages/liquidity/pool/index.js";
import ChartView from "../pages/liquidity/chartView/index.js";
import PriceView from "../pages/liquidity/priceView/index.js";
import {
  HOME,
  LIQUIDITY,
  TOKENS,
  STAKING1,
  STAKING2,
  VIEW,
  STAKING,
  TOKENVIEW,
  POOL,
  CHARTVIEW,
  PRICEVIEW
} from "./routes";
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';

// Register components
echarts.use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
]);

function Routers() {
  return (
    <Routes>
      <Route
        path={HOME}
        element={
          <GeneralRoute layout={MainLayout}>
            <Home />
          </GeneralRoute>
        }
      />
      <Route
        path={LIQUIDITY}
        element={
          <GeneralRoute layout={MainLayout}>
            <Liquidity />
          </GeneralRoute>
        }
      />
      <Route
        path={POOL}
        element={
          <GeneralRoute layout={MainLayout}>
            <LiquidityPool />
          </GeneralRoute>
        }
      />
      <Route
        path={VIEW}
        element={
          <GeneralRoute layout={MainLayout}>
            <LiquidityView />
          </GeneralRoute>
        }
      />
      <Route
        path={TOKENS}
        element={
          <GeneralRoute layout={MainLayout}>
            <Tokens />
          </GeneralRoute>
        }
      />
      <Route
        path={TOKENVIEW}
        element={
          <GeneralRoute layout={MainLayout}>
            <TokenView />
          </GeneralRoute>
        }
      />
      <Route
        path={CHARTVIEW}
        element={
          <GeneralRoute layout={MainLayout}>
            <ChartView />
          </GeneralRoute>
        }
      />
      <Route
        path={PRICEVIEW}
        element={
          <GeneralRoute layout={MainLayout}>
            <PriceView />
          </GeneralRoute>
        }
      />
      <Route
        path={STAKING}
        element={
          <GeneralRoute layout={MainLayout}>
            <Staking />
          </GeneralRoute>
        }
      />
      <Route
        path={STAKING1}
        element={
          <GeneralRoute layout={MainLayout}>
            <Home />
          </GeneralRoute>
        }
      />
      <Route
        path={STAKING2}
        element={
          <GeneralRoute layout={MainLayout}>
            <Home />
          </GeneralRoute>
        }
      />
      <Route
        path="*"
        element={
          <GeneralRoute layout={MainLayout}>
            <PageNotFound />
          </GeneralRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
