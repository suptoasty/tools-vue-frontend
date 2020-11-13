<template>
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
            <v-text-field v-model="StudentObject.student_fname"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Student last name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="StudentObject.student_lname"></v-text-field>
          </v-col>
        </v-row>
       <v-row>
          <v-col>
            <p>Student Initial:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="StudentObject.student_initial"></v-text-field>
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
              :return-value.sync="StudentObject.student_graduation_date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="StudentObject.student_graduation_date"
                  label="Graduation Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="StudentObject.student_graduation_date"
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
                  @click="$refs.menu.save(StudentObject.student_graduation_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
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
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";
export default {
  name: "EditStudent",
  props: {
    StudentObject: {
      type: Object,
      default() {
        return {
          student_fname: "",
          student_lname: "",
          student_initial: "",
          student_graduation_date: ""
        };
      },
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
  mounted() {
    console.log(this.StudentObject);
  },
  methods: {
    saveStudent() {
      CourseService.putStudent(this.StudentObject.student_id, this.StudentObject)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error.response);
        });
    },
    addStudent() {
      CourseService.postStudent(this.StudentObject)
        .then(() => {
          router.push({ name: this.returnTo });
        })
        .catch((error) => {
          console.log("There was an error" + error.response);
        });
    },
  },
  data: () => ({}),
};
</script>
