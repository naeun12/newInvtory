/** @format */

import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Dashboard from "@/views/Auth/Dashboard.vue";
import Items from "@/views/Auth/Items.vue";
import Printers from "@/views/Auth/Printer.vue";
import DashboardPrinter from "@/views/Auth/DashboardPrinter.vue";
import Logistic from "@/views/Auth/Logistic.vue";
import Issuances from "@/views/Auth/Issuances.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Items",
    name: "Items",
    component: Items,
  },
  {
    path: "/Printers",
    name: "Printers",
    component: Printers,
  },
  {
    path: "/DashboardPrinter",
    name: "DashboardPrinter",
    component: DashboardPrinter,
  },
  {
    path: "/Logistic",
    name: "Logistic",
    component: Logistic,
  },
  {
    path: "/Issuances",
    name: "Issuances",
    component: Issuances,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
