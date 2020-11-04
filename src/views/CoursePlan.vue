<template>
  <v-container>
    <v-dialog
      v-model="addItemDialog"
    >
      <v-card>
        <v-card-title>
          Add Course
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-select
              class="mx-1"
              :items="allSemesters"
              item-text="semester_name"
              label="Semester"
              v-model="itemToAdd.semesterData"
            ></v-select>
            <v-select
              class="mx-1"
              :items="allCourses"
              item-text="course_name"
              label="Course"
              v-model="itemToAdd.courseData"
            ></v-select>
            <v-text-field
                  v-model="itemToAdd.course_plan_item_grade"
                  label="Grade"
            ></v-text-field>
            <v-select
              class="mx-1"
              :items="statusItems"
              label="Status"
              v-model="itemToAdd.course_plan_item_status"
            ></v-select>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="addCoursePlanItem"
          >
            Add
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="addItemDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row align="start">
      <h1>{{ student.student_fname }}'s Course Plan</h1>
    </v-row>
    <v-row align="start">
        <v-btn
          color="primary"
          v-on:click.native="saveCoursePlan"
          >Save</v-btn
        >
        <v-btn
          class="ml-4"
          color="primary"
          :to="{
            name: this.returnTo,
          }"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          class="ml-4"
          Normal
          @click="generatePDF()"
          >Download PDF</v-btn
        >
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
                <v-icon>
                  {{semesterShow[index] ? "mdi-chevron-down" : "mdi-chevron-right"}}
                </v-icon>
                <v-toolbar-title>
                  {{usedSemesters[index].semester_name}}
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-title>
                  {{"Total Hours: " + totalHours[index]}}
                </v-toolbar-title>
              </v-app-bar>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" v-show="semesterShow[index]">
          <v-col cols="10">
            <v-data-table
              hide-default-footer
              :headers="headers"
              :items="semesterItems"
              item-key="course_plan_item_id"
            >
              <template v-slot:item.course_plan_item_grade="{ item }">
                <v-text-field
                  v-model="item.course_plan_item_grade"
                ></v-text-field>
              </template>
              <template v-slot:item.course_plan_item_status="{ item }">
                <v-select
                  menu-props="auto"
                  v-model="item.course_plan_item_status"
                  :items="statusItems"
                  item-value="text"
                ></v-select>
              </template>
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
                            @click="removeCoursePlanItem(index, item)"
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          color="blue lighten-1 white--text"
          class="mb-8 ml-3"
          outlined
          height="40"
          x-large
          right
          @click="showAddItemDialog()"
          >Add Course</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  name: "Home",
  props: {
    index: {
      default: undefined,
    },
    returnTo: {
      default: "ViewStudents",
    },
  },
  data: () => ({
    addItemDialog: false,
    itemToAdd: {},
    statusItems: [
      "complete", "enrolled", "planned",
    ],
    student: { student_fname: "Bob" },
    coursePlan: {},
    totalHours: [],
    sortedCoursePlanItems: [],
    deletedCoursePlanItemIDs: [],
    usedSemesters: [],
    allSemesters: [],
    allCourses: [],
    semesterShow: [],
  }),
  methods: {
    generatePDF() {
      const columns = [
        { title: "Id", dataKey: "course_plan_item_id" },
        { title: "Course Name", dataKey: "courseName" },
        { title: "Course Number", dataKey: "courseNumber" },
        { title: "Credit Hours", dataKey: "courseHours" },
        { title: "Grade", dataKey: "course_plan_item_grade" },
        { title: "Status", dataKey: "course_plan_item_status" },
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(`${this.student.student_fname}'s Course Plan`, 0.5, 1.0);
      // create a line under heading 
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      let i = 0;
      let k = 0;
      let finalY = 1.2;
      let pdfCoursePlanItems = this.sortedCoursePlanItems;
      for (i = 0; i < pdfCoursePlanItems.length; i++) {
        for (k = 0; k < pdfCoursePlanItems[i].length; k++) {
          pdfCoursePlanItems[i][k].courseName = pdfCoursePlanItems[i][k].courseData.course_name;
          pdfCoursePlanItems[i][k].courseNumber = pdfCoursePlanItems[i][k].courseData.course_num;
          pdfCoursePlanItems[i][k].courseHours = pdfCoursePlanItems[i][k].courseData.course_hours;
        }
        finalY += 0.5
        doc.setFontSize(12).text(`${this.usedSemesters[i].semester_name}`, 0.5, finalY);
        finalY += 0.2;
        // Using autoTable plugin
        doc.autoTable({
          columns,
          startY: finalY,
          body: pdfCoursePlanItems[i],
          margin: { left: 0.5, top: 1.25 }
        });
        finalY = doc.lastAutoTable.finalY;
        console.log(doc.lastAutoTable.finalY);
      }
        
      // Creating footer and saving file
      doc.save(`${this.student.student_fname}CoursePlan.pdf`);
    },
    sqlDateTimeToJsDate(dateTime) {
      let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
      dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

      const dateObject = new Date(...dateTimeParts);
      return dateObject;
    },
    sqlDateToJsDate(date) {
      let dateParts = date.split("-");
      dateParts[1]--;
      dateParts[2] = dateParts[2].substr(0, 2);
      const dateObject = new Date(...dateParts, 0, 0, 0, 0);
      return dateObject;
    },
    toggleSemesterShow(index) {
      //push and pop to get the v-for to re-render. Dum solution to a dum problem
      this.sortedCoursePlanItems.push([]);
      this.sortedCoursePlanItems.pop();
      this.semesterShow[index] = !this.semesterShow[index];
    },
    saveCoursePlan () {
      let i = 0;
      let k = 0;
      for (i = 0; i < this.deletedCoursePlanItemIDs.length; i++) {
        CourseService.deleteCoursePlanItem(this.coursePlan.course_plan_id, this.deletedCoursePlanItemIDs[i]);
      }
      for (i = 0; i < this.sortedCoursePlanItems.length; i++) {
        for (k = 0; k < this.sortedCoursePlanItems[i].length; k++) {
          if (this.sortedCoursePlanItems[i][k].isNewItem === true) {
            this.sortedCoursePlanItems[i][k].isNewItem = false;
            CourseService.postCoursePlanItem(this.coursePlan.course_plan_id, this.sortedCoursePlanItems[i][k]);
          } else {
            CourseService.putCoursePlanItem(this.coursePlan.course_plan_id, this.sortedCoursePlanItems[i][k].course_plan_item_id, this.sortedCoursePlanItems[i][k]);
          }
        }
      }
      router.push({
        name: this.returnTo,
      });
    },
    showAddItemDialog() {
      //reset itemToAdd
      this.itemToAdd = {
        course_plan_item_grade: "100",
        course_plan_item_status: "planned",
        plan: this.coursePlan.course_plan_id,
        semester: this.allSemesters[0].semester_id,
        semesterData: this.allSemesters[0].semester_name,
        course: this.allCourses[0].course_id,
        courseData: this.allCourses[0].course_name,
        isNewItem: true,
      };
      //show the dialog
      this.addItemDialog = true;
    },
    addCoursePlanItem() {
      //update sortedCoursePlanItems, usedSemesters, totalHours, and semesterShow

      //complete the data in itemToAdd
      this.itemToAdd.semesterData = this.allSemesters.find(element => element.semester_name === this.itemToAdd.semesterData);
      this.itemToAdd.courseData = this.allCourses.find(element => element.course_name === this.itemToAdd.courseData);
      this.itemToAdd.semester = this.itemToAdd.semesterData.semester_id;
      this.itemToAdd.course = this.itemToAdd.courseData.course_id;
      //hide the dialog
      this.addItemDialog = false;
      //find the semester that we are adding the course plan item to
      let foundSemester = this.usedSemesters.find(element => this.itemToAdd.semesterData.semester_id === element.semester_id)
      //add a semester to usedSemesters if we didn't find it
      if (foundSemester === null || foundSemester === undefined) {
        let insertionIdx = -1;
        let inserted = false;
        while (!inserted && insertionIdx < this.usedSemesters.length - 1)
        {
          insertionIdx++;
          //if itemToAdd is less than or equal to the element at insertionIdx, then insert before insertionIdx
          if (this.sqlDateToJsDate(this.usedSemesters[insertionIdx].semester_start) - this.sqlDateToJsDate(this.itemToAdd.semesterData.semester_start) >= 0) {
            inserted = true;
            this.usedSemesters.splice(insertionIdx, 0, this.itemToAdd.semesterData);
            this.sortedCoursePlanItems.splice(insertionIdx, 0, []);
            this.totalHours.splice(insertionIdx, 0, 0);
            this.semesterShow.splice(insertionIdx, 0, true);
          }
        }
        //if we can't insert before any usedSemesters, insert at the end of the array
        if (!inserted) {
          this.usedSemesters.push(this.itemToAdd.semesterData);
          this.sortedCoursePlanItems.push([]);
          this.totalHours.push(0);
          this.semesterShow.push(true);
        }
        //update foundSemester
        foundSemester = this.itemToAdd.semesterData;
      }
      //insert the course into a used semester
      let semesterAddIdx = this.usedSemesters.indexOf(foundSemester);
      this.itemToAdd.innerIndex = this.sortedCoursePlanItems[semesterAddIdx].length;
      this.sortedCoursePlanItems[semesterAddIdx].push(this.itemToAdd);
      this.totalHours[semesterAddIdx] += Number(this.itemToAdd.courseData.course_hours);
      this.semesterShow[semesterAddIdx] = true;
    },
    removeCoursePlanItem(usedSemestersIndex, item) {
      //update deletedCoursePlanItemIDs, sortedCoursePlanItems, usedSemesters, totalHours, and semesterShow

      //remove the item
      if (item.course_plan_item_id !== undefined && item.course_plan_item_id !== null) {
        if (!this.deletedCoursePlanItemIDs.includes(item.course_plan_item_id)) {
          this.deletedCoursePlanItemIDs.push(item.course_plan_item_id);
        }
      }
      this.sortedCoursePlanItems[usedSemestersIndex].splice(item.innerIndex, 1);
      this.totalHours[usedSemestersIndex] -= Number(item.courseData.course_hours);
      //update inner indexes
      for (let i = item.innerIndex; i < this.sortedCoursePlanItems[usedSemestersIndex].length; i++) {
        this.sortedCoursePlanItems[usedSemestersIndex][i].innerIndex--;
      }
      //get rid of the usedSemester if there are no more items in that semester
      if (this.sortedCoursePlanItems[usedSemestersIndex].length < 1) {
        this.sortedCoursePlanItems.splice(usedSemestersIndex, 1);
        this.usedSemesters.splice(usedSemestersIndex, 1);
        this.totalHours.splice(usedSemestersIndex, 1);
        this.semesterShow.splice(usedSemestersIndex, 1);
      }
    },
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
      let outterIndex = -1;
      tempSemesters.forEach((semester) => {
        let foundMatch = false;
        let innerIndex = 0;
        allCoursePlanItems.forEach((coursePlanItem) => {
          if (coursePlanItem.semester == semester.semester_id)
          {
            //make an array of arrays in sortedCoursePlanItems. The index of each array matches the index of the semester
            if (!foundMatch) {
              outterIndex++;
              this.semesterShow.push(false);
              this.totalHours.push(0);
              this.sortedCoursePlanItems.push([]);
              foundMatch = true;
            }
            //set the course
            coursePlanItem.courseData = this.allCourses.filter( (value) => coursePlanItem.course == value.course_id)[0];
            //set the inner index
            coursePlanItem.innerIndex = innerIndex;
            innerIndex++;
            //add to total hours at outter index
            this.totalHours[outterIndex] += Number(coursePlanItem.courseData.course_hours);
            //make the status lowercase
            coursePlanItem.course_plan_item_status = coursePlanItem.course_plan_item_status.toLowerCase();
            //push the item
            this.sortedCoursePlanItems[outterIndex].push(coursePlanItem);
          }
        });
      });
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Course Name',
          align: 'start',
          value: 'courseData.course_name',
        },
        {
          text: 'Course Number',
          align: 'start',
          value: 'courseData.course_num',
        },
        //add course times here?
        {
          text: 'Credit Hours',
          align: 'start',
          value: 'courseData.course_hours',
        },
        {
          text: 'Grade',
          align: 'start',
          value: 'course_plan_item_grade',
        },
        {
          text: 'Status',
          align: 'start',
          value: 'course_plan_item_status',
        },
        { text: "Actions", value: "actions" },
      ]
    },
  },
  mounted() {
    CourseService.getStudent(this.index).then( (response) => {
      this.student = response.data[0];
    });
    //get course plan for this student
    CourseService.getCoursePlanForStudent(this.index).then( (response) => {
      this.coursePlan = response.data[0];
      //get the course plan items
      CourseService.getCoursePlanItems(this.coursePlan.course_plan_id).then( (responseItems) => {
        //get all semesters
        CourseService.getSemesters().then( (responseSemesters) => {
          this.allSemesters = responseSemesters.data;
          CourseService.getCourses().then( (responseCourses) => {
            this.allCourses = responseCourses.data;
            //build the semester and course plan items list
            this.buildSemesterCoursePlanItems(responseItems.data);
          });
        });
      });
    });
  },
}
</script>