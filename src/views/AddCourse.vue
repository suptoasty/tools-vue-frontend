<template>
  <div>
    <AddingCourse :courseObject="course"/>
  </div>
</template>
<script>
// @ is an alias to /src

import AddingCourse from '@/components/AddingCourse.vue'
export default {
  components: {
    AddingCourse
  },
  data() {
    return{
      course: Object
    }
  }
};



</script>
