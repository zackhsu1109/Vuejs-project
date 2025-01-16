import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import BonusMallView from "./views/BonusMallView.vue";
import BonusMallHistoryView from "./views/BonusMallHistoryView.vue";

//路由設定
//URL => Component
const routes = [
    //http://localhost:5173/ => HomeView.vue
    //http://localhost:5173/home => HomeView.vue
    { path: "/", component: HomeView, name: "home", alias: '/home' },

    //http://localhost:5173/BonusMall => BonusMallView.vue
    { path: "/BonusMall", component: BonusMallView, name: "BonusMall" },

    //http://localhost:5173/BonusMallHistory => BonusMallView.vue
    { path: "/BonusMallHistory", component: BonusMallHistoryView, name: "BonusMallHistory" },

]

const router = createRouter({
    history: createWebHistory(),//指定用哪一種方式產生歷史紀錄
    routes //指定路由設定，參數名稱跟路由設定的變數名稱一樣
})

export default router