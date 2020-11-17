<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="7">
          <v-row>
            <v-col>
              <h1 v-if="isAdd">Add Student</h1>
              <h1 v-else>Edit Student</h1>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <p>Student first name:</p>
            </v-col>
            <v-col>
              <v-text-field v-model="student.student_fname"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Student last name:</p>
            </v-col>
            <v-col>
              <v-text-field v-model="student.student_lname"></v-text-field>
            </v-col>
          </v-row>
        <v-row>
            <v-col>
              <p>Student Initial:</p>
            </v-col>
            <v-col>
              <v-text-field v-model="student.student_initial"></v-text-field>
            </v-col>
          </v-row>
        <v-row>
            <v-col>
              <p>Graduation Date:</p>
            </v-col>
            <v-col>
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
          <v-row>
            <v-col>
              <p>Degree:</p>
            </v-col>
            <v-col>
              <v-select
                  :items="degrees"
                  item-text="degree_name"
                  label="Degree"
                  v-model="studentDegreeName"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Advisor:</p>
            </v-col>
            <v-col>
              <v-select
                  :items="advisors"
                  item-text="advisor_fname"
                  label="Advisor"
                  v-model="studentAdvisorName"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="isAdd">
            <v-col align="center">
              <v-btn v-on:click.native="addStudent" color="primary">Add</v-btn>
            </v-col>
            <v-col align="center">
              <v-btn
                color="primary"
                :to="{
                  name: this.returnTo,
                }"
                >Back</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col align="center">
              <v-btn v-on:click.native="saveStudent" color="primary">Save</v-btn>
            </v-col>
            <v-col align="center">
              <v-btn
                color="primary"
                :to="{
                  name: this.returnTo,
                }"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";
export default {
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
      default: false,
    },
  },
  data() {
    return {
      student: {
        student_fname: "",
        student_lname: "",
        student_initial: "",
        student_graduation_date: "",
        student_degree: undefined,
        student_advisor: undefined
      },
      datePickerVisible: false,
      advisors: [],
      degrees: [],
      studentAdvisorName: undefined,
      studentDegreeName: undefined,
    };
  },
  mounted() {
    if (!this.isAdd) {
      CourseService.getStudent(this.index)
      .then((response) => {
          this.student = response.data[0];
          CourseService.getAdvisors().then( (response) => {
            this.advisors = response.data;
            let tempAdvisor = this.advisors.find( (element) => { return element.advisor_id == this.student.student_advisor });
            if (tempAdvisor != undefined && tempAdvisor != null)
              this.studentAdvisorName = tempAdvisor.advisor_fname;
          });
          CourseService.getDegrees().then( (response) => {
            this.degrees = response.data;
            let tempDegree = this.degrees.find( (element) => { return element.degree_id == this.student.student_degree });
            if (tempDegree != undefined && tempDegree != null)
              this.studentDegreeName = tempDegree.degree_name;
          });
      })
      .catch((error) => {
        console.log("created error: " + error);
      });
    }
    
  },
  methods: {
    convertNamesToIDs() {
      if (this.studentAdvisorName != undefined && this.studentAdvisorName != null)
        this.student.student_advisor = this.advisors.find( (element) => { return element.advisor_fname == this.studentAdvisorName }).advisor_id;
      if (this.studentDegreeName != undefined && this.studentDegreeName != null)
        this.student.student_degree = this.degrees.find( (element) => { return element.degree_name == this.studentDegreeName }).degree_id;
      console.log(this.student);
    },
    saveStudent() {
      this.convertNamesToIDs();
      CourseService.putStudent(this.student.student_id, this.student)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error);
        });
    },
    addStudent() {
      this.convertNamesToIDs();
      CourseService.postStudent(this.student)
        .then(() => {
          router.push({ name: this.returnTo });
        })
        .catch((error) => {
          console.log("There was an error" + error);
        });
    },
  },
};
</script>
