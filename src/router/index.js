import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ViewCourse from "../views/ViewCourse.vue";
import EditCourse from "../views/EditCourse.vue";

Vue.use(VueRouter);

function dynamicPropsFn(route) {
  return {
    returnTo: route.params.returnTo,
    courseIndex: route.params.courseIndex,
    isAdd: route.params.isAdd,
  };
}

const routes = [
  {
    path: "/view/:courseIndex",
    name: "ViewCourse",
    component: ViewCourse,
    props: true,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/edit/:courseIndex/",
    name: "EditCourse",
    component: EditCourse,
    props: dynamicPropsFn,
  },
  {
    path: "/add/",
    name: "AddCourse",
    component: EditCourse,
    props: dynamicPropsFn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
