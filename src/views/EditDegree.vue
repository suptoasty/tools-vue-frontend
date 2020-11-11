<template>
  <div>
    <EditingDegree :DegreeObject="degree" :returnTo="returnTo" :isAdd="isAdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingDegree from "@/components/EditingDegree.vue";
export default {
  components: {
    EditingDegree,
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
      degree: {},
    };
  },
  mounted() {
    this.getDegree();
  },
  methods: {
    getDegree() {
        console.log("returnTo: " + this.returnTo);
      CourseService.getDegree(this.index)
        .then((response) => {
          this.degree = response.data[0];
        })
        .catch((error) => {
          console.log("created error: " + error.response);
        });
    },
  },
};
</script>
