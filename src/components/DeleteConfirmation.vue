<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Would you like to delete {{modalTitle}}</v-card-title>
      <v-card-text>All Contents Will Be Deleted! This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="onDelete(courseID)">Delete</v-btn>
        <v-btn color="green darken-1" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";

export default {
  name: "DeleteConfirmation",
  data: () => ({
    dialog: false,
    courseID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(course) {
      this.modalTitle = course.course_name + ": " + course.course_id;
      this.courseID = course.course_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING: " + id);
      this.dialog = false;
      await CourseService.deleteCourse(id);
      await this.$root.$emit('CourseDeleted');
      router.push({ name: "Home" });
    },
    onCancel() {
      this.dialog = false;
      this.courseID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteCourse", course => {
      this.onShowModal(course);
    });
  }
};
</script>