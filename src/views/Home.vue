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
        <v-data-table
          :headers="headers"
          :items="classes"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import ClassListing from "@/components/ClassListing.vue";

export default {
  name: "Home",
  components: {
    //ClassListing
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
    headers: [
      {text: 'Name', value: 'course_name'},
      {text: 'Description', value: 'course_desc'}
    ],
    classes: [
      { course_name: 'SEIV', course_desc: 'A lot of things happen' },
      { course_name: 'SEIV', course_desc: 'A lot of things happen' }
    ],
    page: 1
  })
};
</script>
