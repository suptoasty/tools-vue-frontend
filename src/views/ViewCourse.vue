<template>
    <v-container
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
        <DisplayClass :classObject="{ name: 'SEIV class' }"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DisplayClass from "@/components/DisplayClass.vue";

export default {
  name: "ViewCourse",
  components: {
    DisplayClass
  }
};
</script>
