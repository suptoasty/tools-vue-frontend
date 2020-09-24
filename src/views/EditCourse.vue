<template>
  <div>
    <EditingCourse :courseObject="course" :returnTo="returnTo" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingCourse from '@/components/EditingCourse.vue'
export default {
  components: {
    EditingCourse
  },
  props: ['courseIndex', 'returnTo'],
  data() {
    return{
      course: Object
    }
  },
  created() {
    this.getCourse();
  },
  methods: {
    getCourse () {
      CourseService.getCourse(this.courseIndex)
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
