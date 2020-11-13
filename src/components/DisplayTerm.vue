<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1>{{ termObject.term_name }}</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p>Term name:</p></v-col>
          <v-col>
            <p>{{ termObject.term_name }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Term Abbreviation:</p></v-col>
          <v-col>
            <p>{{ termObject.term_abbr }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col align = "center">
            <v-btn
              color="primary"
              :to="{ name: 'EditTerm', params: { index: termObject.term_id, returnTo: 'ViewTerm' }}"
            >Edit</v-btn>
          </v-col>
          <v-col align = "center">
            <v-btn color="red darken-2 white--text" @click="onDelete(termObject)">Delete</v-btn>
          </v-col>
          <v-col align = "center">
            <v-btn color="primary" :to="{ name: 'ViewTerms' }">Back</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ViewTerm",
  props: ["termObject"],
  data: () => ({}),
  methods: {
    onDelete(term) {
      console.log("Emiting Delete for: " + term.term_name);
      this.$root.$emit("deleteCourse", term);
    }
  }
};
/*
location.reload()
*/
</script>
