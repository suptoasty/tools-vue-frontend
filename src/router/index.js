import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ViewCourse from "../views/ViewCourse.vue";
import ViewAdvisors from "../views/ViewAdvisors.vue";
import EditCourse from "../views/EditCourse.vue";
import Login from "../views/Login.vue";
import TestEdit from "../views/TestEdit.vue";
import UserRegistration from "../views/UserRegistration.vue";
import EditTerm from "@/views/EditTerm.vue";
import ViewTerm from "@/views/ViewTerm.vue";
import TermListing from "@/views/TermListing.vue";
import { getStore } from "@/config/util.js";

Vue.use(VueRouter);

function dynamicPropsFn(route) {
  return {
    returnTo: route.params.returnTo,
    index: route.params.index,
    isAdd: route.params.isAdd,
  };
}

function userRegistrationProps(route) {
  return {
    returnTo: route.params.returnTo,
    index: route.params.index,
    isAdd: route.params.isAdd,
    isAdvisor: route.params.isAdvisor,
  };
}

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/viewcourse/:index",
    name: "ViewCourse",
    component: ViewCourse,
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["student", "advisor"],
    },
  },
  {
    path: "/viewterm/:index",
    name: "ViewTerm",
    component: ViewTerm,
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["student", "advisor"],
    },
  },
  {
    path: "/termlisting",
    name: "TermListing",
    component: TermListing,
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["student", "advisor"],
    },
  },
  {
    path: "/viewadvisors",
    name: "ViewAdvisors",
    component: ViewAdvisors,
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/home",
    alias: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["student", "advisor"],
    },
  },
  {
    path: "/editcourse/:index/",
    name: "EditCourse",
    component: EditCourse,
    props: dynamicPropsFn,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/editterm/:index/",
    name: "EditTerm",
    component: EditTerm,
    props: dynamicPropsFn,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/editadvisor/:index/",
    name: "EditAdvisor",
    component: UserRegistration, //need to change later
    props: userRegistrationProps,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/addcourse/",
    name: "AddCourse",
    component: EditCourse,
    props: dynamicPropsFn,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/addterm/",
    name: "AddTerm",
    component: EditTerm,
    props: dynamicPropsFn,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/addadvisor/",
    name: "AddAdvisor",
    component: UserRegistration, //need to change later
    props: userRegistrationProps,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["advisor"],
    },
  },
  {
    path: "/register",
    name: "UserRegistration",
    component: UserRegistration,
    props: userRegistrationProps,
    meta: {
      requiresAuth: false,
      authorizedRoles: [],
    },
  },
  {
    path: "/removeme",
    name: "RemoveMe",
    component: TestEdit,
    props: userRegistrationProps,
    meta: {
      requiresAuth: false,
      authorizedRoles: [],
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //if the route requires authorization, check the use's roles
  console.log(to);
  if (to.meta.requiresAuth === true) {
    console.log(getStore("user"));

    //find out if the user can go to the route
    let isAuthenticated = false;
    let user = getStore("user");
    if (user) {
      user.roles.forEach((role) => {
        //if the route's authorized roles includes one of our user roles, then the user is authorized
        if (to.meta.authorizedRoles.includes(role)) {
          isAuthenticated = true;
        }
      });
    }

    //redirect to login if user not authorized to go to the route
    if (!isAuthenticated) next({ name: "Login" });
    else next();
  } else next();
});

export default router;
