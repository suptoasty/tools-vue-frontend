<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text>All Contents Will Be Deleted! <br/> This Cannot Be Undone!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(degreeID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";

export default {
  name: "DegreeDeleteConfirmation",
  data: () => ({
    dialog: false,
    degreeID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(degree) {
      this.modalTitle = degree.degree_name + ": " + degree.degree_id;
      this.degreeID = degree.degree_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING DEGREE: " + id);
      this.dialog = false;
      await CourseService.deleteDegree(id);
      await this.$root.$emit('DegreeDeleted');
    },
    onCancel() {
      this.dialog = false;
      this.degreeID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteDegree", degree => {
      this.onShowModal(degree);
    });
  }
};
</script>