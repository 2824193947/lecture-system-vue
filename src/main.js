import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import "./common/common.css"
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.config.globalProperties.$message = ElMessage;

app.mount("#app");
