<template>
  <div id="nav">
    <v-app-bar app color="primary">
      <div v-if="showNav === 'Advisor'">
        <v-btn text to="/" color="white">Home</v-btn>
        <v-btn text to="/termlisting" color="white">Terms</v-btn>
        <v-btn text to="/viewsemesters" color="white">Semesters</v-btn>
        <v-btn text to="/viewadvisors" color="white">Advisors</v-btn>
        <v-btn text to="/viewstudents" color="white">Students</v-btn>
        <v-btn text to="/viewdegrees" color="white">Degrees</v-btn>
      </div>
      <div v-else-if="showNav === 'Student'">
        <v-btn text to="/" color="white">Home</v-btn>
        <v-btn text @click="goToCoursePlan()" color="white">Course Plan</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login" color="white">Login</v-btn>
        <v-btn text to="/register" color="white">register</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { getStore } from "@/config/util";
import router from "@/router/index";

export default {
  name: "NavBar",
  computed: {
    showNav: {
      get: function() {
        let user = getStore("user");
        if (user && typeof user.roles == typeof []) {
          if (user.roles.includes("advisor")) {
            return "Advisor";
          } else {
            return "Student";
          }
        }

        return "None";
      }
    }
  },
  methods: {
    goToCoursePlan() {
      let user = getStore("user");
      let id = user.studentID;

      console.log("THINGS: "+JSON.stringify(user));

      router.push("courseplan/"+id);
    }
  }
};
</script>

<style>
</style>