import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home_page/Home_MAIN";
import NotFoundException from "../components/404.vue";
import RODO from "../components/RODO";
Vue.use(VueRouter);
// routes
import admin from "./admin";
import offers from "./offers";
import events from "./events";
import instructors from "./instructors";
//
const routes = [
    {
        path: "*",
        name: "404",
        component: NotFoundException,
        meta: {
            title: "Aktualności"
        }
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/rodo",
        name: "RODO",
        component: RODO,
        meta: {
            title: "Polityka RODO"
        }
    },
    ...admin,
    ...offers,
    ...events,
    ...instructors
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
// set static page title
const DEFAULT_PAGE_NAME = "Trenuj prosto";
document.title = DEFAULT_PAGE_NAME;
// set different title for each page
router.beforeEach((to, from, next) => {
    // console.clear();
    //
    let title = (to.matched[0].meta && to.matched[0].meta.title) || DEFAULT_PAGE_NAME;
    document.title = title;
    next();
});
//
export default router;
