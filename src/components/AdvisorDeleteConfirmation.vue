<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text>All Contents Will Be Deleted! <br/> This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(advisorID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";

export default {
  name: "AdvisorDeleteConfirmation",
  data: () => ({
    dialog: false,
    advisorID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(advisor) {
      this.modalTitle = advisor.advisor_fname + ": " + advisor.advisor_id;
      this.advisorID = advisor.advisor_ID;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING ADVISOR: " + id);
      this.dialog = false;
      await CourseService.deleteSemester(id);
      await this.$root.$emit('AdvisorDeleted');
      router.push({ name: "ViewSemesters" });
    },
    onCancel() {
      this.dialog = false;
      this.semesterID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteAdvisor", advisor => {
      this.onShowModal(advisor);
    });
  }
};
</script>