<template>
<v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row align="center" justify="center">
          <h1 class="text-center h1">Advisors List</h1>
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
                label="Search Advisors"
                v-model="search"
                outlined
                height="59"
              >
              </v-text-field>
              <v-btn
                color="blue lighten-1 white--text"
                class="mb-8 ml-3"
                @click="
                  $router.push({
                    name: 'AddAdvisor',
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
                >Add Advisor</v-btn
              >
            </v-input>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-data-table
            :headers="headers"
            :items="advisors"
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
                            name: 'EditAdvisor',
                            params: {
                              index: item.advisor_id,
                              returnTo: 'ViewAdvisors',
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
    ],
    includeInSearch: [0, 1],
    advisors: [],
    page: 1,
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
          value: "advisor_fname",
          filterable: this.includeInSearch.includes(0),
        },
        {
          text: "Department",
          value: "advisor_department",
          filterable: this.includeInSearch.includes(1),
        },
        { text: "Actions", value: "actions" },
      ];
    },
  },
  mounted() {
    CourseService.getAdvisors()
      .then((response) => {
        this.advisors = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
    this.$root.$on("CourseDeleted", () => {
      CourseService.getCourses()
        .then((response) => {
          this.advisors = response.data;
        })
        .catch((error) => {
          console.log("there was an error:" + error.response);
        });
    });
  },
};
</script>
