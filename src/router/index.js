import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";

import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import CostEstimations from "../views/CostEstimations.vue";
import NewCostEstimation from "../views/NewCostEstimation.vue";
import EditCostEstimation from "../views/EditCostEstimation.vue";
import Settings from "../views/Settings.vue"
import ShowCostEstimation from "../views/ShowCostEstimation.vue";
import LegalNotice from "../views/LegalNotice.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guestOnly: true }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { authOnly: true }
    },
    {
        path: "/cost-estimations",
        name: "CostEstimations",
        component: CostEstimations,
        meta: { authOnly: true }
    },
    {
        path: "/cost-estimations/new",
        name: "NewCostEstimation",
        component: NewCostEstimation,
        meta: { authOnly: true }
    },
    {
        path: "/cost-estimation/edit/:id",
        name: "EditCostEstimation",
        component: EditCostEstimation,
        props: true,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: "/cost-estimation/show/:id",
        name: "ShowCostEstimation",
        component: ShowCostEstimation,
        props: true,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: { authOnly: true }
    },
    {
        path: "/legal-notice",
        name: "LegalNotice",
        component: LegalNotice,
        meta: { authOnly: false }
    },
    {
        path: "/privacy-policy",
        name: "PrivacyPolicy",
        component: PrivacyPolicy,
        meta: { authOnly: false }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.users.loggedIn) {
            next({
                path: "/",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.state.users.loggedIn) {
            next({
                path: "/dashboard",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;