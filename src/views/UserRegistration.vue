<template>
  <v-form v-model="valid">
    <v-container>
      <v-checkbox v-if="isAdd" label="Advisor" v-model="isAdvisorData">Is Advisor</v-checkbox>
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

      <v-row v-if="isAdvisorData">
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
      <v-row v-if="isAdd">
        <v-col align="center">
          <v-btn @click="createUser()">Register</v-btn>
        </v-col>
        <v-col align="center">
          <v-btn @click="cancel()">Cancel</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col align="center">
          <v-btn @click="saveUser()">Save</v-btn>
        </v-col>
        <v-col align="center">
          <v-btn @click="cancel()">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";

export default {
  name: "UserRegistration",
  props: {
    index: {
      default: undefined,
    },
    returnTo: {
      type: String,
      default: undefined,
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
    isAdvisor: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    //data
    userId: undefined,
    userStudent: undefined,
    userAdvisor: undefined,
    firstName: "",
    lastName: "",
    middleInitial: "",
    email: "",
    department: "", //advisor only
    gradDate: "", //student only
    degree: "", //student only
    advisor: "", //student only
    //
    // checks
    valid: false,
    isAdvisorData: false,
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

    //if we are in an edit, then the user will no longer be able to switch between advisor and student
    //so the respective fields will be fetched either as a student or as an advisor
    if (!this.isAdd) {
      if (this.isAdvisor) {
        CourseService.getAdvisor(this.index).then(response => {
          console.log(response);
          this.userId = response.data[0].user_id;
          this.userStudent = response.data[0].student;
          this.userAdvisor = response.data[0].advisor;
          this.email = response.data[0].user_email;

          this.firstName = response.data[0].advisor_fname;
          this.lastName = response.data[0].advisor_lname;
          this.middleInitial = response.data[0].advisor_initial;
          this.department = response.data[0].advisor_department;
        });
      } else {
        CourseService.getStudent(this.index).then(response => {
          this.userId = response.data[0].user_id;
          this.userStudent = response.data[0].student;
          //this needs to be fixed in the backend
          CourseService.getUser(this.userId).then(userResponse => {
            this.userAdvisor = userResponse.data[0].advisor;
          });
          this.email = response.data[0].user_email;

          this.firstName = response.data[0].student_fname;
          this.lastName = response.data[0].student_lname;
          this.middleInitial = response.data[0].student_initial;
          this.gradDate = response.data[0].student_graduation_date;
          this.degree = response.data[0].degree;
          this.advisor = response.data[0].advisor;
        });
      }
    }
    //store the isAdvisor prop into the isAdvisorData since it is bad to change prop data
    this.isAdvisorData = this.isAdvisor;
  },
  methods: {
    cancel() {
      if (this.returnTo !== undefined && this.returnTo !== null) {
        router.push({ name: this.returnTo });
      } else {
        router.push({ name: "Login" });
      }
    },
    saveUser() {
      let user = {
        user_name: "remove",
        user_password: "remove",
        user_email: this.email,
        student: this.userStudent,
        advisor: this.userAdvisor
      };

      if (this.isAdvisorData) {
        this.editAdvisor(user);
      } else {
        this.editStudent(user);
      }
    },
    editAdvisor(user) {
      let advisor = {
        advisor_fname: this.firstName,
        advisor_initial: this.middleInitial,
        advisor_lname: this.lastName,
        advisor_department: this.department
      };

      CourseService.putAdvisor(this.userAdvisor, advisor).then(() => {
        CourseService.putUser(this.userId, user).then(() => {
          router.push({ name: this.returnTo });
        });
      });
    },
    editStudent(user) {
      let student = {
        student_fname: this.firstName,
        student_initial: this.middleInitial,
        student_lname: this.lastName,
        student_graduation_date: this.gradDate,
        degree: this.degree,
        advisor: this.advisor
      };

      CourseService.putStudent(this.userStudent, student).then(() => {
        CourseService.postUser(this.userId, user).then(() => {
          router.push({ name: this.returnTo });
        });
      });
    },
    createUser() {
      let user = {
        user_name: "remove",
        user_password: "remove",
        user_email: this.email,
        student: null,
        advisor: null
      };

      if (this.isAdvisorData) {
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
          if (this.returnTo !== undefined && this.returnTo !== null) {
            router.push({ name: this.returnTo });
          } else {
            router.push({ name: "Login" });
          }
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
          if (this.returnTo !== undefined && this.returnTo !== null)
          {
            router.push({ name: this.returnTo });
          }
          else
          {
            router.push({ name: "Login" });
          }
        });
      });
    }
  }
};
</script>

<style>
</style>