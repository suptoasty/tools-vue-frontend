<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1 v-if="isAdd">Add Semester</h1>
            <h1 v-else>Edit Semester</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <p>Semester name:</p>
          </v-col>
          <v-col>
            <v-text-field v-model="SemesterObject.semester_name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Start date:</p>
          </v-col>
          <v-col>
            <v-menu
              ref="startDateMenu"
              v-model="startDatePickerVisible"
              :close-on-content-click="false"
              :return-value.sync="SemesterObject.semester_start"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="SemesterObject.semester_start"
                  label="Semester Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="SemesterObject.semester_start"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startDatePickerVisible = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDateMenu.save(SemesterObject.semester_start)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
       <v-row>
          <v-col><!--SemesterObject.semester_end-->
            <p>End date:</p>
          </v-col>
          <v-col>
            <v-menu
              ref="endDateMenu"
              v-model="endDatePickerVisible"
              :close-on-content-click="false"
              :return-value.sync="SemesterObject.semester_end"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="SemesterObject.semester_end"
                  label="Semester End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="SemesterObject.semester_end"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endDatePickerVisible = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDateMenu.save(SemesterObject.semester_end)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
       <v-row>
         <v-col>
            <p>Term:</p>
          </v-col>
         <v-col>
            <v-select
                :items="terms"
                item-text="term_name"
                label="Semester"
                v-model="SemesterObject.term_name"
            ></v-select>
          </v-col>
        </v-row>
       
        <v-row v-if="isAdd">
          <v-col align="center">
            <v-btn v-on:click.native="addSemester" color="primary">Add</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
              color="primary"
              :to="{
                name: this.returnTo,
              }"
              >Back</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col align="center">
            <v-btn v-on:click.native="saveSemester" color="primary">Save</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
              color="primary"
              :to="{
                name: this.returnTo,
              }"
              >Cancel</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";
export default {
  name: "EditSemester",
  props: {
    SemesterObject: {
      type: Object,
      default() {
        return {
          semester_name: "",
          semester_start: "",
          semester_end: "",
          semester_term: "",
          term_name: "",
        };
      },
    },
    returnTo: {
      type: String,
      default: undefined,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    endDatePickerVisible: false,
    startDatePickerVisible: false,
    terms: []
  }),
  mounted() {
    CourseService.getTerms().then ( (response) => {
      this.terms = response.data;
    });
  },
  methods: {
    saveSemester() {
      this.SemesterObject.semester_term = this.terms.find(element => element.term_name === this.SemesterObject.term_name).term_id;
      CourseService.putSemester(this.SemesterObject.semester_id, this.SemesterObject)
        .then(() => {
          router.push({
            name: this.returnTo,
          });
        })
        .catch((error) => {
          console.log("Save class error: " + error.response);
        });
    },
    addSemester() {
      this.SemesterObject.semester_term = this.terms.find(element => element.term_name === this.SemesterObject.term_name).term_id;
      CourseService.postSemester(this.SemesterObject)
        .then(() => {
          router.push({ name: this.returnTo });
        })
        .catch((error) => {
          console.log("There was an error" + error.response);
        });
    },
  },
};
</script>
