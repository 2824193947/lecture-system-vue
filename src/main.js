import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import "./common/common.css"
import store from "./store";

import ECharts from 'vue-echarts'
import { use } from "echarts/core"

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const app = createApp(App);
app.component('v-chart', ECharts)
app.use(router);
app.use(ElementPlus);
app.use(store);
app.config.globalProperties.$message = ElMessage;

app.mount("#app");
