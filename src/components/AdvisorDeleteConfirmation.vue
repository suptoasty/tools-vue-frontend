<template>
  <v-dialog v-model="dialog" persistent max-width="400">
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
      this.advisorID = advisor.advisor_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING ADVISOR: " + id);
      this.dialog = false;
      await CourseService.deleteAdvisor(id);
      await this.$root.$emit('AdvisorDeleted');
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