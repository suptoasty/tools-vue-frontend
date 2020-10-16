<template>
  <v-form v-model="valid">
    <v-container>
      <v-checkbox label="Advisor" v-model="isAdvisor">Is Advisor</v-checkbox>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstName"
            :rules="nameRules"
            label="First Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastName"
            :rules="nameRules"
            label="Last Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="isAdvisor">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="department"
            label="Department"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-date-picker
            v-model="gradDate"
            label="Graduation Date"
          ></v-date-picker>
        </v-col>
        <v-col>
          <v-select
            v-model="degree"
            label="Degree"
            :items="degreeList"
            item-text="degree_name"
            item-value="degree_id"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="advisor"
            label="Advisor"
            :items="advisorList"
            item-text="advisor_lname"
            item-value="advisor_id"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="createUser()">Register</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";

export default {
  name: "UserRegistration",
  data: () => ({
    //data
    firstName: "",
    lastName: "",
    middleInitial: "",
    email: "",
    department: "",
    gradDate: "",
    degree: "",
    advisor: "",
    //
    // checks
    valid: false,
    isAdvisor: false,
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 30 || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    degreeList: [],
    advisorList: []
    //
  }),
  mounted() {
    CourseService.getDegrees().then(response => {
      this.degreeList = response.data;
    });

    CourseService.getAdvisors().then(response => {
      this.advisorList = response.data;
    });
  },
  methods: {
    createUser() {
      let user = {
        user_name: "remove",
        user_password: "remove",
        user_email: this.email,
        student: null,
        advisor: null
      };

      if (this.isAdvisor) {
        this.createAdvisor(user);
      } else {
        this.createStudent(user);
      }
    },
    createAdvisor(user) {
      let advisor = {
        advisor_fname: this.firstName,
        advisor_initial: this.middleInitial,
        advisor_lname: this.lastName,
        advisor_department: this.department
      };

      CourseService.postAdvisor(advisor).then(response => {
        user.advisor = response.data.id;
        CourseService.postUser(user).then(() => {
          router.push({ name: "Login" });
        });
      });
    },
    createStudent(user) {
      let student = {
        student_fname: this.firstName,
        student_initial: this.middleInitial,
        student_lname: this.lastName,
        student_graduation_date: this.gradDate,
        degree: this.degree,
        advisor: this.advisor
      };

      CourseService.postStudent(student).then(async response => {
        user.student = response.data.id;
        CourseService.postUser(user).then(() => {
          router.push({ name: "Login" });
        });
      });
    }
  }
};
</script>

<style>
</style>