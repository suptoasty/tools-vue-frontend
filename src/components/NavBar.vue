<template>
  <div id="nav">
    <v-app-bar app color="primary">
      <div v-if="showNav === 'Advisor'">
        <v-btn text :to="{ name: 'Home' }" color="white">Home</v-btn>
        <v-btn text :to="{ name: 'ViewTerms' }" color="white">Terms</v-btn>
        <v-btn text :to="{ name: 'ViewSemesters' }" color="white">Semesters</v-btn>
        <v-btn text :to="{ name: 'ViewAdvisors' }" color="white">Advisors</v-btn>
        <v-btn text :to="{ name: 'ViewStudents' }" color="white">Students</v-btn>
        <v-btn text :to="{ name: 'ViewDegrees' }" color="white">Degrees</v-btn>
        <v-btn text @click="logout()" color="white">Logout</v-btn>
      </div>
      <div v-else-if="showNav === 'Student'">
        <v-btn text to="/" color="white">Home</v-btn>
        <v-btn text @click="goToCoursePlan()" color="white">Course Plan</v-btn>
        <v-btn text @click="logout()" color="white">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text :to="{ name: 'Login' }" color="white">Login</v-btn>
        <v-btn text :to="{ name: 'UserRegistration' }" color="white">register</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { getStore } from "@/config/util";
import { removeItem } from "@/config/util";
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
    },
    logout() {
      removeItem("user");
      router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>