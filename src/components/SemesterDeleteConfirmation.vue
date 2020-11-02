<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text>All Contents Will Be Deleted! <br/> This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(semesterID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";

export default {
  name: "SemesterDeleteConfirmation",
  data: () => ({
    dialog: false,
    semesterID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(semester) {
      this.modalTitle = semester.semester_name + ": " + semester.semester_id;
      this.semesterID = semester.semester_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING SEMESTER: " + id);
      this.dialog = false;
      await CourseService.deleteSemester(id);
      await this.$root.$emit('SemesterDeleted');
    },
    onCancel() {
      this.dialog = false;
      this.semesterID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteSemester", semester => {
      this.onShowModal(semester);
    });
  }
};
</script>