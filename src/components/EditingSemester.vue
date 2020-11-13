<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1 v-if="isAdd">Add Semester</h1>
            <h1 v-else>Edit Semester</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <p>Semester name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="SemesterObject.semester_name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Start date:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="SemesterObject.semester_start"></v-text-field>
          </v-col>
        </v-row>
       <v-row>
          <v-col>
            <p>End date:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="SemesterObject.semester_end"></v-text-field>
          </v-col>
        </v-row>
       <v-row>
         <v-col>
            <p>Term:</p>
          </v-col>
         <v-col>
            <v-select
                :items="terms"
                item-text="term_name"
                label="Semester"
                v-model="SemesterObject.term_name"
            ></v-select>
          </v-col>
        </v-row>
       
        <v-row v-if="isAdd">
          <v-col align="center">
            <v-btn v-on:click.native="addSemester" color="primary">Add</v-btn>
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
            <v-btn v-on:click.native="saveSemester" color="primary">Save</v-btn>
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
  name: "EditSemester",
  props: {
    SemesterObject: {
      type: Object,
      default() {
        return {
          semester_name: "",
          semester_start: "",
          semester_end: "",
          semester_term: "",
          term_name: "",
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
  data: () => ({
    terms: []
  }),
  mounted() {
    CourseService.getTerms().then ( (response) => {
      this.terms = response.data;
      this.SemesterObject.term_name = this.terms.find(element => element.term_id == this.SemesterObject.term_id).term_name;
    });
    console.log(this.SemesterObject);
  },
  methods: {
    saveSemester() {
      this.SemesterObject.semester_term = this.terms.find(element => element.term_name === this.SemesterObject.term_name).term_id;
      CourseService.putSemester(this.SemesterObject.semester_id, this.SemesterObject)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error.response);
        });
    },
    addSemester() {
      CourseService.postSemester(this.SemesterObject)
        .then(() => {
          router.push({ name: this.returnTo });
        })
        .catch((error) => {
          console.log("There was an error" + error.response);
        });
    },
  },
};
</script>
