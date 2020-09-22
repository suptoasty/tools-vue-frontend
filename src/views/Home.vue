<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <v-row align="center" justify="center">
          <h1 class="text-center h1">Course List</h1>
        </v-row>
        <v-row>
          <v-text-field label="Search" outlined></v-text-field>
          <v-overflow-btn class="my-0" :items="searchOptions" label="Search By"></v-overflow-btn>
        </v-row>
        <v-row align="center" justify="center">
          <v-data-table :headers="headers" :items="classes" :items-per-page="5" class="elevation-1">
            <template v-slot:item="row">
              <tr>
                <td>
                  <ClassListing :classObject="row.item" />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
      <DeleteConfirmation />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import ClassListing from "@/components/ClassListing.vue";
import DeleteConfirmation from "@/components/DeleteConfirmation.vue";

export default {
  name: "Home",
  components: {
    ClassListing,
    DeleteConfirmation
  },
  data: () => ({
    searchOptions: [
      "Name",
      "Number",
      "Semesters Offered",
      "Credit Hours",
      "Field of Study",
      "Class Level"
    ],
    headers: [{ text: "Name", value: "course_name" }],
    classes: [],
    page: 1
  }),
  methods: {
    // onSort: function(items, index, isDesc) {
    //   items.sort((a, b) => {
    //     console.log(isDesc);
    //     if (a.course_id > b.course_id) return -1;
    //     if (a.course_id < b.course_id) return 1;
    //     return 0;
    //   });
    //   return items;
    // }
  },
  created() {
    CourseService.getCourses()
      .then(response => {
        this.classes = response.data;
      })
      .catch(error => {
        console.log("there was an error:" + error.response);
      });
  }
};
</script>
