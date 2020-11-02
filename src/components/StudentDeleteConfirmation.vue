<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text>All Contents Will Be Deleted! <br/> This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(studentID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";

export default {
  name: "StudentDeleteConfirmation",
  data: () => ({
    dialog: false,
    studentID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(student) {
      this.modalTitle = student.student_fname + ": " + student.student_id;
      this.studentID = student.student_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING STUDENT: " + id);
      this.dialog = false;
      await CourseService.deleteStudent(id);
      await this.$root.$emit('StudentDeleted');
      router.push({ name: "ViewStudents" });
    },
    onCancel() {
      this.dialog = false;
      this.studentID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteStudent", student => {
      this.onShowModal(student);
    });
  }
};
</script>