<template>
  <div>
    <EditingSemester :SemesterObject="semester" :returnTo="returnTo" :isAdd="isAdd" />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import EditingSemester from "@/components/EditingSemester.vue";
export default {
  components: {
    EditingSemester,
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
      semester: {},
    };
  },
  mounted() {
    this.getSemester();
  },
  methods: {
    getSemester() {
      CourseService.getSemester(this.index)
        .then((response) => {
          this.semester = response.data[0];
        })
        .catch((error) => {
          console.log("created error: " + error.response);
        });
    },
  },
};
</script>
