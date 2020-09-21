<template>
  <div>
    <AddingCourse :courseObject="course"/>
  </div>
</template>
<!--I was thinking that Lane can just pass this a random course and then I will just edit that course in the add page and then push it so that I do not have to make a new course object-->
<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import AddingCourse from '@/components/AddingCourse.vue'
export default {
  components: {
    AddingCourse
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
