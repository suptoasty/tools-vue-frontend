<template>
  <div>
    <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1 v-if="isAdd">Add Term</h1>
            <h1 v-else>Edit Term</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <p>Term name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="term.term_name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Abbreviation:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="term.term_abbr"></v-text-field>
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
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingTerm from "@/components/EditingTerm.vue";
import router from "@/router/index.js";

export default {
  components: {
    EditingTerm,
  },
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
      term: {},
    };
  },
  mounted() {
    this.getTerm();
  },
  methods: {
    getTerm() {
      CourseService.getTerm(this.index)
        .then((response) => {
          this.term = response.data[0];
        })
        .catch((error) => {
          console.log("created error: " + error.response);
        });
    },
    saveTerm() {
      let id = this.term.term_id;
      console.log(id);
      CourseService.putTerm(id, this.term)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error);
        });
    },
    addTerm() {
      CourseService.postTerm(this.term)
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
