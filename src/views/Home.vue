<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="2"
        sm="5"
        md="5"
      >
        <ClassListing :classObject="{ name: 'SEIV' }"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ClassListing from "@/components/ClassListing.vue";

export default {
  name: "Home",
  components: {
    ClassListing
  }
};
</script>
