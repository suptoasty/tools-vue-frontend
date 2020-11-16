<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline" style="word-break: normal">Delete "{{modalTitle}}"?</v-card-title>
      <v-card-text><em>WARNING: This Cannot Be Undone!</em><br/>
                  Deleting this term will also delete any associated:<br/>
                  <ul>
                    <li>Semesters</li>
                    <li>Course Plan Items</li>
                    <li>Degree Plan Items</li>
                  </ul>
                  </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="onDelete(termID)">Delete</v-btn>
        <v-btn color="primary" text @click="onCancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CourseService from "@/services/CourseService.js";

export default {
  name: "TermDeleteConfirmation",
  data: () => ({
    dialog: false,
    termID: null,
    modalTitle: ""
  }),
  methods: {
    onShowModal(term) {
      this.modalTitle = term.term_name + " (" + term.term_abbr + ")";
      this.termID = term.term_id;
      this.dialog = true;
    },
    async onDelete(id) {
      console.log("DELETING TERM: " + id);
      this.dialog = false;
      await CourseService.deleteTerm(id);
      await this.$root.$emit('TermDeleted');
    },
    onCancel() {
      this.dialog = false;
      this.termID = null;
    }
  },
  mounted() {
    this.$root.$on("deleteTerm", term => {
      this.onShowModal(term);
    });
  }
};
</script>