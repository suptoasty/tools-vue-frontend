<template>
  <div>
    <DisplayCourse :courseObject="course" />
    <CourseDeleteConfirmation />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import DisplayCourse from "@/components/DisplayCourse.vue";
import CourseDeleteConfirmation from "@/components/CourseDeleteConfirmation.vue";

export default {
  components: {
    DisplayCourse,
    CourseDeleteConfirmation
  },
  props: ["index"],
  data() {
    return {
      course: Object
    };
  },
  mounted() {
    console.log("View course created");
    this.getCourse();
  },
  methods: {
    getCourse () {
      CourseService.getCourse(this.index)
      .then(response => {
        this.course = response.data[0];
        console.log(this.course);
      })
      .catch(error => {
        console.log("created error: " + error.response)
      })
    }
  }
};
</script>
