<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1 v-if="isAdd">Add Course</h1>
            <h1 v-else>Edit Course</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <p>Term name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="TermObject.term_name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Abbreviation:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="TermObject.term_abbr"></v-text-field>
          </v-col>
        </v-row>
       
        <v-row v-if="isAdd">
          <v-col align="center">
            <v-btn v-on:click.native="addTerm" color="primary">Add</v-btn>
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
            <v-btn v-on:click.native="saveTerm" color="primary">Save</v-btn>
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
  name: "EditCourse",
  props: {
    TermObject: {
      type: Object,
      default() {
        return {
          term_name: "",
          term_abbr: "",
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
    console.log(this.TermObject);
  },
  methods: {
    saveTerm() {
      CourseService.putTerm(this.TermObject.term_id, this.TermObject)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error.response);
        });
    },
    addTerm() {
      CourseService.postTerm(this.TermObject)
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
