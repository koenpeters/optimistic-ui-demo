import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const PessimisticView1 = () => import("@/views/PessimisticView1.vue");
const PessimisticView2 = () => import("@/views/PessimisticView2.vue");
const OptmisticView = () => import("@/views/OptimisticView.vue");

export const ROUTE_NAMES = {
  PESSIMISTIC1: "Pessimistic1",
  PESSIMISTIC2: "Pessimistic2",
  OPTIMISTIC: "Optimistic",
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/pessimistic1",
    name: ROUTE_NAMES.PESSIMISTIC1,
    component: PessimisticView1,
  },
  {
    path: "/pessimistic2",
    name: ROUTE_NAMES.PESSIMISTIC2,
    component: PessimisticView2,
  },
  {
    path: "/optimistic",
    name: ROUTE_NAMES.OPTIMISTIC,
    component: OptmisticView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
