import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import ViewCourse from "../views/ViewCourse.vue";

Vue.use(VueRouter);

const routes = [
  
  {
    path: "/class/:courseIndex",
    name: "ViewCourse",
    component: ViewCourse,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
