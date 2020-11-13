<template>
<v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row align="center" justify="center">
          <h1 class="text-center h1">Students List</h1>
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
                label="Search Students"
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
                    name: 'AddStudent',
                    params: {
                      index: undefined,
                      returnTo: 'ViewStudents',
                      isAdd: true,
                    },
                  })
                "
                outlined
                height="40"
                x-large
                right
                >Add Student</v-btn
              >
            </v-input>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-data-table
            :headers="headers"
            :items="students"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <tr>
                <td  v-if="userRoles.includes('advisor')">
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
                            name: 'CoursePlan',
                            params: {
                              index: item.student_id,
                              returnTo: 'ViewStudents',
                            },
                          })
                        "
                      >
                        <v-icon>mdi-clipboard-text-search</v-icon>
                      </v-btn>
                    </template>
                    <span>Course Plan</span>
                  </v-tooltip>
                </td>
                <td  v-if="userRoles.includes('advisor')">
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
                            name: 'EditStudent',
                            params: {
                              index: item.student_id,
                              returnTo: 'ViewStudents',
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
      <StudentDeleteConfirmation />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import StudentDeleteConfirmation from "@/components/StudentDeleteConfirmation.vue";
import { getStore } from "@/config/util.js";

export default {
  name: "ViewStudents",
  components: {
    StudentDeleteConfirmation,
  },
  data: () => ({
    search: "",
    searchOptions: [
      "ID",
      "Name",
      "GraduationDate",
    ],
    includeInSearch: [0, 1, 2],
    students: [],
    page: 1,
    userRoles: [],
  }),
  methods: {
    onDelete(student) {
      console.log("Emiting Delete for: " + student.student_fname);
      this.$root.$emit("deleteStudent", student);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          value: "student_id",
          filterable: this.includeInSearch.includes(0),
        },
        {
          text: "Name",
          value: "student_fname",
          filterable: this.includeInSearch.includes(1),
        },
        {
          text: "GraduationDate",
          value: "student_graduation_date",
          filterable: this.includeInSearch.includes(2),
        },
        
        { text: "Actions", value: "actions" },
      ];
    },
  },
  mounted() {
    this.userRoles = getStore("user").roles;
    CourseService.getStudents()
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
    this.$root.$on("StudentDeleted", () => {
      CourseService.getStudents()
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log("there was an error:" + error.response);
        });
    });
  },
};
</script>
