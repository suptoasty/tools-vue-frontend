<template>
  <v-container>
    <v-row align="start">
      <h1>{{ student.student_fname }}'s Course Plan</h1>
    </v-row>
    <v-row v-for="(semesterItems, index) in sortedCoursePlanItems" :key="index" align="start">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card @click="toggleSemesterShow(index)">
              <v-app-bar
                flat
                color="white"
              >
                <v-toolbar-title>
                  {{usedSemesters[index].semester_name}}
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-title>
                  Total Hours: X
                </v-toolbar-title>
                <v-icon>
                  {{semesterShow[index] ? "mdi-arrow-up-drop-circle" : "mdi-arrow-down-drop-circle"}}
                </v-icon>
              </v-app-bar>
            </v-card>
          </v-col>
        </v-row>
        <v-data-table
          hide-default-footer
          v-show="semesterShow[index]"
          :headers="headers"
          :items="semesterItems"
          item-key="course_plan_item_id"
        >
        </v-data-table>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CourseService from "@/services/CourseService.js";
export default {
  name: "Home",
  props: {
    index: {
      default: undefined,
    },
    student: {
      default () {
        return {
          student_fname: "Bob",
        }
      },
    },
  },
  data: () => ({
    coursePlan: {},
    sortedCoursePlanItems: [],
    usedSemesters: [],
    allSemesters: [],
    semesterShow: [],
  }),
  methods: {
    sqlDateTimeToJsDate(dateTime) {
      let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
      dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

      const dateObject = new Date(...dateTimeParts);
      return dateObject;
    },
    sqlDateToJsDate(date) {
      let dateParts = date.split("-");
      dateParts[1]--;
      const dateObject = new Date(...dateParts, 0, 0, 0, 0);
      return dateObject;
    },
    toggleSemesterShow(index) {
      //push and pop to get the v-for to re-render. Dum solution to a dum problem
      this.sortedCoursePlanItems.push([]);
      this.sortedCoursePlanItems.pop();
      this.semesterShow[index] = !this.semesterShow[index];
    },
    // addUsedSemester(allSemestersIndex) {
    //   //update usedSemesters
    // },
    // removeUsedSemester(usedSemestersIndex) {
    //   //update usedSemesters
    // },
    // addCoursePlanItem(UsedSemestersIndex) {
    //   //update sortedCoursePlanItems
    // },
    // removeCoursePlanItem(usedSemestersIndex, usedItemsIndex) {
    //   //update sortedCoursePlanItems
    // },
    //call this to sort allCoursePlanItems into an array of arrays for each usedSemester
    buildSemesterCoursePlanItems(allCoursePlanItems) {
      //filter semesters by if their id is included in the list of course plan items
      let tempSemesters = this.allSemesters;
      tempSemesters = tempSemesters.filter((value) => {
        let found = false;
        allCoursePlanItems.forEach((cpItem) => {
          if (value.semester_id == cpItem.semester)
            found = true;
        });
        return found;
      });
      //sort semesters by date
      tempSemesters.sort( (a, b) => {
        return this.sqlDateToJsDate(a.semester_start) - this.sqlDateToJsDate(b.semester_start);
      });
      this.usedSemesters = tempSemesters;
      //split the course plan items by each semester
      this.sortedCoursePlanItems = [];
      let index = -1;
      tempSemesters.forEach((semester) => {
        let foundMatch = false;
        allCoursePlanItems.forEach((coursePlanItem) => {
          if (coursePlanItem.semester == semester.semester_id)
          {
            //make an array of arrays in sortedCoursePlanItems. The index of each array matches the index of the semester
            if (!foundMatch) {
              index++;
              this.semesterShow.push(false);
              this.sortedCoursePlanItems.push([]);
              foundMatch = true;
            }
            this.sortedCoursePlanItems[index].push(coursePlanItem);
          }
        });
      });
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Course Plan Item Id',
          align: 'start',
          value: 'course_plan_item_id',
        },
      ]
    },
  },
  mounted() {
    //get course plan for this student
    CourseService.getCoursePlan(this.index).then( (response) => {
      this.coursePlan = response.data[0];
      //get the course plan items
      CourseService.getCoursePlanItems(this.coursePlan.course_plan_id).then( (responseItems) => {
        //get all semesters
        CourseService.getSemesters().then( (responseSemesters) => {
           this.allSemesters = responseSemesters.data;
           //build the semester and course plan items list
           this.buildSemesterCoursePlanItems(responseItems.data);
        });
      });
    });
  },
}
</script>