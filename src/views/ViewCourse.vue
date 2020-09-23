<template>
  <div>
    <DisplayCourse :courseObject="course" />
    <DeleteConfirmation />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import DisplayCourse from "@/components/DisplayCourse.vue";
import DeleteConfirmation from "@/components/DeleteConfirmation.vue";

export default {
  components: {
    DisplayCourse,
    DeleteConfirmation
  },
  props: ["courseIndex"],
  data() {
    return {
      course: Object
    };
  },
  created() {
    CourseService.getCourse(this.courseIndex)
      .then(response => {
        this.course = response.data[0];
        console.log(this.course);
      })
      .catch(error => {
        console.log("created error: " + error.response);
      });
  }
};
</script>
