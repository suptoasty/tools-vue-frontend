<template>
  <v-form v-model="valid">
    <v-container>
      <!-- User Role -->
      <v-row v-if="isAdd">
        <v-col cols="12" md="6">
          <v-select
            v-model="userRole"
            :items="possibleRoles"
            label="User Role"
            :rules="roleRules"
          ></v-select>
        </v-col>
      </v-row>

      <!-- First Name, Last Name -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="both.fname"
            :rules="nameRules"
            label="First Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="both.lname"
            :rules="nameRules"
            label="Last Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Email -->
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="user.user_email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Advisor Department -->
      <div v-if="userRole == possibleRoles[1]">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="advisor.advisor_department"
              label="Department"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- Student -->
      <div v-else>
        <!-- Graduation Date -->
        <v-row>
          <v-col md="14">
            <v-menu
              ref="menu"
              v-model="datePickerVisible"
              :close-on-content-click="false"
              :return-value.sync="student.student_graduation_date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="student.student_graduation_date"
                  label="Graduation Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="student.student_graduation_date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePickerVisible = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(student.student_graduation_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <!-- Degree -->
        <v-row>
          <v-col>
            <v-select
              v-model="student.student_degree"
              label="Degree"
              :items="degreeList"
              item-text="degree_name"
              item-value="degree_id"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Student Advisor -->
        <v-row>
          <v-col>
            <v-select
              v-model="student.student_advisor"
              label="Advisor"
              :items="advisorList"
              item-text="fullName"
              item-value="advisor_id"
            ></v-select>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col align="center" v-if="isAdd">
          <v-btn @click="saveUser()">Register</v-btn>
        </v-col>
        <v-col align="center" v-else>
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
    datePickerVisible: false,
    user: {
      user_id: undefined,
      user_email: "",
      user_student: undefined,
      user_advisor: undefined,
    },
    student: {
      student_graduation_date: "",
      student_degree: null,
      student_advisor: null,
    },
    advisor: {
      advisor_department: "",
    },
    both: {
      fname: "",
      lname: "",
      initial: "",
    },
    possibleRoles: ["Student", "Advisor"],
    userRole: "",
    // checks
    valid: false,
    roleRules: [(v) => v.length != 0 || "User must have a role"],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 255 || "Name must be less than 256 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    degreeList: [],
    advisorList: [],
  }),
  mounted() {
    CourseService.getDegrees().then((response) => {
      this.degreeList = response.data;
    });

    CourseService.getAdvisors().then((response) => {
      this.advisorList = response.data;
      this.advisorList.forEach((e) => {
        e.fullName = e.advisor_lname + ", " + e.advisor_fname;
        if (e.advisor_initial != null) {
          e.fullName += " " + e.advisor_initial;
        }
      });
    });

    if (this.isAdvisor) {
      this.userRole = this.possibleRoles[1];
    } else {
      this.userRole = this.possibleRoles[0];
    }

    //if we are in an edit, then the user will no longer be able to switch between advisor and student
    //so the respective fields will be fetched either as a student or as an advisor
    if (!this.isAdd) {
      if (this.isAdvisor) {
        CourseService.getAdvisor(this.index).then((response) => {
          let r = response.data[0];
          this.user.user_id = r.user_id;
          this.user.user_email = r.user_email;
          this.user.user_student = r.user_student;
          this.user.user_advisor = r.user_advisor;

          this.both.fname = r.advisor_fname;
          this.both.lname = r.advisor_lname;
          this.both.initial = r.advisor_initial;

          this.advisor.advisor_department = r.advisor_department;
        });
      } else {
        CourseService.getStudent(this.index).then((response) => {
          let r = response.data[0];
          this.user.user_id = r.user_id;
          this.user.user_email = r.user_email;
          this.user.user_student = r.user_student;
          this.user.user_advisor = r.user_advisor;

          this.both.fname = r.student_fname;
          this.both.lname = r.student_lname;
          this.both.initial = r.student_initial;

          this.student.student_graduation_date = r.student_graduation_date;
          this.student.student_degree = r.student_degree;
          this.student.student_advisor = r.student_advisor;
        });
      }
    }
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
      if (this.userRole == this.possibleRoles[1]) {

        console.log("saving advisor");
        this.saveAdvisor();
      } else {
        this.saveStudent();
      }
    },
    saveAdvisor() {
      this.advisor.advisor_fname = this.both.fname;
      this.advisor.advisor_lname = this.both.lname;
      this.advisor.advisor_initial = this.both.initial;

      if (this.isAdd) {
        CourseService.postAdvisor(this.advisor).then((response) => {
          this.user.user_advisor = response.data.id;
          CourseService.postUser(this.user).then(() => {
            if (this.returnTo !== undefined && this.returnTo !== null) {
              router.push({ name: this.returnTo });
            } else {
              router.push({ name: "Login" });
            }
          });
        });
      } else {
        CourseService.putAdvisor(this.index, this.advisor).then(() => {
          CourseService.putUser(this.userId, this.user).then(() => {
            router.push({ name: this.returnTo });
          });
        }).catch( (response) => {
          console.log("error:" + response);
        });
      }
    },
    saveStudent() {
      this.student.student_fname = this.both.fname;
      this.student.student_lname = this.both.lname;
      this.student.student_initial = this.both.initial;

      if (this.isAdd) {
        CourseService.postStudent(this.student).then(async (response) => {
          this.user.user_student = response.data.id;
          console.log("Posting:", this.user);
          CourseService.postUser(this.user).then(() => {
            if (this.returnTo !== undefined && this.returnTo !== null) {
              router.push({ name: this.returnTo });
            } else {
              router.push({ name: "Login" });
            }
          });
          CourseService.postCoursePlan({
            course_plan_last_updated: new Date(),
            course_plan_student: this.user.user_student
          });
        });
      } else {
        CourseService.putStudent(this.user.user_student, this.student).then(() => {
            CourseService.putUser(this.user.user_id, this.user).then(() => {
              router.push({ name: this.returnTo });
            });
          }
        );
      }
    },
  },
};
</script>

<style></style>
