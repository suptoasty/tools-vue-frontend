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
                  v-model="includeInSearch"
                >
                  <v-chip v-for="tag in searchOptions" :key="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-subtitle>
            </v-card>
            <v-input>
              <v-text-field
                label="Search Courses"
                v-model="search"
                outlined
                height="59"
              >
              </v-text-field>
              <v-btn v-if="userRoles.includes('advisor')"
                color="blue lighten-1 white--text"
                class="mb-8 ml-3"
                @click="
                  $router.push({
                    name: 'AddCourse',
                    params: {
                      index: undefined,
                      returnTo: 'Home',
                      isAdd: true,
                    },
                  })
                "
                outlined
                height="40"
                x-large
                right
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
                            params: { index: item.course_id },
                          })
                        "
                      >
                        <v-icon>mdi-book-open-variant</v-icon>
                      </v-btn>
                    </template>
                    <span>View</span>
                  </v-tooltip>
                </td>
                <td v-if="userRoles.includes('advisor')">
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
                            params: {
                              index: item.course_id,
                              returnTo: 'Home',
                              isAdd: false,
                            },
                          })
                        "
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                </td>
                <td v-if="userRoles.includes('advisor')">
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
                        <v-icon color="red darken-2">mdi-delete</v-icon>
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
import { getStore } from "@/config/util.js";

export default {
  name: "Home",
  components: {
    DeleteConfirmation,
  },
  data: () => ({
    search: "",
    searchOptions: [
      "Name",
      "Department",
      "Number",
      "Level",
      "Hours",
      "Description",
    ],
    includeInSearch: [0, 1, 2, 3, 4, 5],
    classes: [],
    page: 1,
    userRoles: [],
  }),
  methods: {
    onDelete(course) {
      console.log("Emiting Delete for: " + course.course_name);
      this.$root.$emit("deleteCourse", course);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "course_name",
          filterable: this.includeInSearch.includes(0),
        },
        {
          text: "Department",
          value: "course_dept",
          filterable: this.includeInSearch.includes(1),
        },
        {
          text: "Number",
          value: "course_num",
          filterable: this.includeInSearch.includes(2),
        },
        {
          text: "Level",
          value: "course_level",
          filterable: this.includeInSearch.includes(3),
        },
        {
          text: "Hours",
          value: "course_hours",
          filterable: this.includeInSearch.includes(4),
        },
        {
          text: "Description",
          value: "course_desc",
          filterable: this.includeInSearch.includes(5),
        },
        { text: "Actions", value: "actions" },
      ];
    },
  },
  mounted() {
    this.userRoles = getStore("user").roles;
    CourseService.getCourses()
      .then((response) => {
        this.classes = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
    this.$root.$on("CourseDeleted", () => {
      CourseService.getCourses()
        .then((response) => {
          this.classes = response.data;
        })
        .catch((error) => {
          console.log("there was an error:" + error.response);
        });
    });
  },
};
</script>
