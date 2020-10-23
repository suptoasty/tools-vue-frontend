<template>
<v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row align="center" justify="center">
          <h1 class="text-center h1">Degrees List</h1>
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
                label="Search Degrees"
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
                    name: 'AddDegree',
                    params: {
                      index: undefined,
                      returnTo: 'ViewDegrees',
                      isAdd: true,
                    },
                  })
                "
                outlined
                height="40"
                x-large
                right
                >Add a degree</v-btn
              >
            </v-input>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-data-table
            :headers="headers"
            :items="degrees"
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
                            name: 'EditDegree',
                            params: {
                              index: item.degree_id,
                              returnTo: 'ViewDegrees',
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
      <DegreeDeleteConfirmation />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CourseService from "@/services/CourseService.js";
import DegreeDeleteConfirmation from "@/components/DegreeDeleteConfirmation.vue";
import { getStore } from "@/config/util.js";

export default {
  name: "ViewDegrees",
  components: {
    DegreeDeleteConfirmation,
  },
  data: () => ({
    search: "",
    searchOptions: [
      "Name",
      "Department",
      "Hours"
    ],
    includeInSearch: [0, 1, 2],
    degrees: [],
    page: 1,
    userRoles: [],
  }),
  methods: {
    onDelete(degree) {
      console.log("Emiting Delete for: " + degree.degree_name);
      this.$root.$emit("deleteDegree", degree);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "degree_name",
          filterable: this.includeInSearch.includes(0),
        },
        {
          text: "Department",
          value: "degree_dept",
          filterable: this.includeInSearch.includes(1),
        },
        {
          text: "Hours",
          value: "degree_hours",
          filterable: this.includeInSearch.includes(1),
        },
        { text: "Actions", value: "actions" },
      ];
    },
  },
  mounted() {
    this.userRoles = getStore("user").roles;
    CourseService.getDegrees()
      .then((response) => {
        this.degrees = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
    this.$root.$on("DegreeDeleted", () => {
      CourseService.getDegrees()
        .then((response) => {
          this.degrees = response.data;
        })
        .catch((error) => {
          console.log("there was an error:" + error.response);
        });
    });
  },
};
</script>
