<template>
  <div>
    <EditingStudent :StudentObject="student" :returnTo="returnTo" :isAdd="isAdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingStudent from "@/components/EditingStudent.vue";
export default {
  components: {
    EditingStudent,
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
      student: {},
    };
  },
  mounted() {
    this.getStudent();
  },
  methods: {
    getStudent() {
      CourseService.getStudent(this.index)
        .then((response) => {
            console.log(response.data[0]);
          this.student = response.data[0];
          console.log(this.student);
        })
        .catch((error) => {
          console.log("created error: " + error.response);
        });
    },
  },
};
</script>
