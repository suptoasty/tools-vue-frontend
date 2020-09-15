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
        cols="5"
      >
        <v-row
          align="center"
          justify="center"
        >
          <h1 class="text-center h1">Course List</h1>
        </v-row>
        <v-row>
            <v-text-field
            label="Search"
            outlined
            >
            </v-text-field>
            <v-overflow-btn
              class="my-n2"
              :items="searchOptions"
              label="Search By"
            ></v-overflow-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="5"
      >
        <ClassListing :classObject="{ name: 'SEIV class', description: 'A lot of things happen' }"/>
        <ClassListing :classObject="{ name: 'SEIV class', description: 'A lot of things happen' }"/>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-pagination
          :length="4"
          v-model="page"
          circle
        ></v-pagination>
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
  },
  data: () => ({
    searchOptions: [
      'Name',
      'Number',
      'Semesters Offered',
      'Credit Hours',
      'Field of Study',
      'Class Level'
    ],
    page: 1
  })
};
</script>
