<template>
  <div>
    <EditingCourse :courseObject="course" :returnTo="returnTo" :isAdd="isAdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingCourse from "@/components/EditingCourse.vue";
export default {
  components: {
    EditingCourse,
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
      course: {},
    };
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      CourseService.getCourse(this.index)
        .then((response) => {
          this.course = response.data[0];
        })
        .catch((error) => {
          console.log("created error: " + error.response);
        });
    },
  },
};
</script>
