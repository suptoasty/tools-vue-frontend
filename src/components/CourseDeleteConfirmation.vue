<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text>All Contents Will Be Deleted! <br/> This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(courseID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";

export default {
  name: "CourseDeleteConfirmation",
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