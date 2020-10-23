<template>
  <div>
    <EditingTerm :TermObject="term" :returnTo="returnTo" :isAdd="isAdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingTerm from "@/components/EditingTerm.vue";
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
  },
};
</script>
