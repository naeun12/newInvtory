/** @format */

import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Dashboard from "@/views/Auth/Dashboard.vue";
import Items from "@/views/Auth/Items.vue";
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
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
