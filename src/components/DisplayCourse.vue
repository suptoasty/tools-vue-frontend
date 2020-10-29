<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col>
            <h1>{{ courseObject.course_name }}</h1>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p>Course name:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_name }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Course Number:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_num }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Description:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_desc }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Course Hours:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_hours }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Course Department:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_dept }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col><p>Class Level:</p></v-col>
          <v-col>
            <p>{{ courseObject.course_level }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col align = "center">
            <v-btn
              color="primary"
              :to="{ name: 'EditCourse', params: { index: courseObject.course_id, returnTo: 'ViewCourse' }}"
            >Edit</v-btn>
          </v-col>
          <v-col align = "center">
            <v-btn color="red darken-2 white--text" @click="onDelete(courseObject)">Delete</v-btn>
          </v-col>
          <v-col align = "center">
            <v-btn color="primary" :to="{ name: 'Home' }">Back</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ViewCourse",
  props: ["courseObject"],
  data: () => ({}),
  methods: {
    onDelete(course) {
      console.log("Emiting Delete for: " + course.course_name);
      this.$root.$emit("deleteCourse", course);
    }
  }
};
/*
location.reload()
*/
</script>
