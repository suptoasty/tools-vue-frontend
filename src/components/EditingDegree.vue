<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1 v-if="isAdd">Add Degree</h1>
            <h1 v-else>Edit Degree</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <p>Degree name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="DegreeObject.degree_name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Degree department:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="DegreeObject.degree_dept"></v-text-field>
          </v-col>
        </v-row>
       <v-row>
          <v-col>
            <p>Degree hours:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="DegreeObject.degree_hours"></v-text-field>
          </v-col>
        </v-row>
       
        <v-row v-if="isAdd">
          <v-col align="center">
            <v-btn v-on:click.native="addDegree" color="primary">Add</v-btn>
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
            <v-btn v-on:click.native="saveDegree" color="primary">Save</v-btn>
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
  name: "EditDegree",
  props: {
    DegreeObject: {
      type: Object,
      default() {
        return {
          degree_name: "",
          degree_dept: "",
          degree_hours: ""
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
    console.log(this.DegreeObject);
  },
  methods: {
    saveDegree() {
      CourseService.putDegree(this.DegreeObject.degree_id, this.DegreeObject)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error.response);
        });
    },
    addDegree() {
      CourseService.postDegree(this.DegreeObject)
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