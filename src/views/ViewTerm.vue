<template>
  <div>
    <DisplayTerm :termObject="term" />
    <TermDeleteConfirmation />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import DisplayTerm from "@/components/DisplayTerm.vue";
import TermDeleteConfirmation from "@/components/TermDeleteConfirmation.vue";

export default {
  components: {
    DisplayTerm,
    TermDeleteConfirmation
  },
  props: ["index"],
  data() {
    return {
      term: Object
    };
  },
  mounted() {
    console.log("View term created");
    this.getTerm();
  },
  methods: {
    getTerm () {
      CourseService.getTerm(this.index)
      .then(response => {
        this.term = response.data[0];
        console.log(this.term);
      })
      .catch(error => {
        console.log("created error: " + error.response)
      })
    }
  }
};
</script>
