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
    // CourseService.getCourses()
    // .then(response => {
    //   this.courses = response.data;
    //   console.log(this.courses);
    // })
    // .catch(error => {
    //   console.log("created error: " + error.response)
    // })
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
