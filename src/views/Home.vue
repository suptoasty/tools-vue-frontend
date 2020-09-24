<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row align="center" justify="center">
          <h1 class="text-center h1">Course List</h1>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card flat>
              <v-card-subtitle>
                Filters:
                <v-chip-group
                  multiple
                  active-class="primary--text"
                  @change="onUpdateSearch"
                >
                  <v-chip v-for="tag in searchOptions" :key="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-subtitle>
            </v-card>
            <v-input>
              <v-text-field label="Search Courses" v-model="search" outlined>
              </v-text-field>
              <v-btn
                color="primary"
                class="mb-7"
                @click="$router.push({ name: 'AddCourse' })"
                outlined
                x-large
                >Add Course</v-btn
              >
            </v-input>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-data-table
            :headers="headers"
            :items="classes"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <tr>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        text
                        fab
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          $router.push({
                            name: 'ViewCourse',
                            params: { courseIndex: item.course_id }
                          })
                        "
                      >
                        <v-icon>mdi-book-open-variant</v-icon>
                      </v-btn>
                    </template>
                    <span>View</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        text
                        fab
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          $router.push({
                            name: 'EditCourse',
                            params: { courseIndex: item.course_id }
                          })
                        "
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        text
                        fab
                        v-bind="attrs"
                        v-on="on"
                        @click="onDelete(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
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
import DeleteConfirmation from "@/components/DeleteConfirmation.vue";

export default {
  name: "Home",
  components: {
    DeleteConfirmation
  },
  data: () => ({
    search: "",
    searchOptions: ["Name", "Department", "Number", "Level", "Description"],
    includeInSearch: ["Name", "Department", "Number", "Level", "Description"],
    classes: [],
    page: 1
  }),
  methods: {
    onDelete(course) {
      console.log("Emiting Delete for: " + course.course_name);
      this.$root.$emit("deleteCourse", course);
    },
    onUpdateSearch(filters) {
      this.includeInSearch = [];
      for (let i = 0; i < filters.length; i++) {
        console.log(this.searchOptions[filters[i]]);
        this.includeInSearch.push(this.searchOptions[filters[i]]);
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "course_name",
          filterable: this.includeInSearch.includes("Name")
        },
        {
          text: "Department",
          value: "course_dept",
          filterable: this.includeInSearch.includes("Department")
        },
        {
          text: "Number",
          value: "course_num",
          filterable: this.includeInSearch.includes("Number")
        },
        {
          text: "Level",
          value: "course_level",
          filterable: this.includeInSearch.includes("Level")
        },
        {
          text: "Hours",
          value: "course_hours",
          filterable: this.includeInSearch.includes("Hours")
        },
        {
          text: "Description",
          value: "course_desc",
          filterable: this.includeInSearch.includes("Description")
        },
        { text: "Actions", value: "actions" }
      ];
    }
  },
  created() {
    CourseService.getCourses()
      .then(response => {
        this.classes = response.data;
      })
      .catch(error => {
        console.log("there was an error:" + error.response);
      });
  },
  mounted() {
    this.$root.$on("CourseDeleted", () => {
      CourseService.getCourses()
        .then(response => {
          this.classes = response.data;
        })
        .catch(error => {
          console.log("there was an error:" + error.response);
        });
    });
  }
};
</script>
