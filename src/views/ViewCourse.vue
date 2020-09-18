<template>
  <div>
    <h1>Class: </h1>
    <DisplayCourse :courseObject="course"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import DisplayCourse from '@/components/DisplayCourse.vue'
export default {
  components: {
    DisplayCourse
  },
  props: ['courseIndex'],
  data() {
    return{
      course: Object
    }
  },
  created() {
    CourseService.getCourse(this.courseIndex)
    .then(response => {
      this.course = response.data[0];
      console.log(this.course);
    })
    .catch(error => {
      console.log("created error: " + error.response)
    })
  }
};



</script>
