<template>
  <div>
    <h1>Class: </h1>
    <DisplayCourse :courseObject="course" :coursesObject="courses"/>
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
  data() {
    return{
      course: [{course_name: "SEIV"}],
      courses: []
    }
  },
  created() {
    CourseService.getCourses()
    .then(response => {
      this.courses = response.data;
      console.log(this.courses);
    })
    .catch(error => {
      console.log("created error: " + error.response)
    })
  }
};



</script>
