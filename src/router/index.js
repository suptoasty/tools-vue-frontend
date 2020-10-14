import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ViewCourse from "../views/ViewCourse.vue";
import ViewAdvisors from "../views/ViewAdvisors.vue";
import EditCourse from "../views/EditCourse.vue";
import Login from "../views/Login.vue";
import { getStore } from "@/config/util.js";

Vue.use(VueRouter);

function dynamicPropsFn(route) {
  return {
    returnTo: route.params.returnTo,
    courseIndex: route.params.courseIndex,
    isAdd: route.params.isAdd,
  };
}

const studentRoutes = ["ViewCourse", "Home"];

const advisorRoutes = ["ViewCourse", "Home", "EditCourse", "AddCourse", "ViewAdvisors"];

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/view/:courseIndex",
    name: "ViewCourse",
    component: ViewCourse,
    props: true,
  },
  {
    path: "/viewadvisors",
    name: "ViewAdvisors",
    component: ViewAdvisors,
    props: true,
  },
  {
    path: "/home",
    alias: "/",
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

router.beforeEach((to, from, next) => {
  //if the route name is not the login page, then check authentication for route
  if (to.name !== "Login") {
    console.log(getStore("user"));

    //find out if the user can go to the route
    let isAuthenticated = false;
    let user = getStore("user");
    if (user) {
      let userRole = user.role;
      switch (userRole) {
        case "advisor":
          //if we can find the route name in advisors routes, then the advisor can go to the route
          isAuthenticated = advisorRoutes.includes(to.name) !== undefined;
          break;
        case "student":
          //if we can find the route name in student routes, then the student can go to the route
          isAuthenticated = studentRoutes.includes(to.name) !== undefined;
          break;
      }
    }

    //redirect to login if user not authenticated to go to the route
    if (!isAuthenticated) next({ name: "Login" });
    else next();
  } else next();
});

export default router;
