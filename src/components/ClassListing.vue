<template>
  <v-card class="elevation-3 mb-4" height="150" style="overflow: hidden">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title
        @click="$router.push({ name: 'ViewCourse', params: {index: classObject.course_id} })"
      >
        <v-btn small text :ripple="false" link>
          <p style="font-style:normal; font-size:2em">{{wrappedName}}</p>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            fab
            v-bind="attrs"
            v-on="on"
            @click="$router.push({ name: 'EditCourse', params: {index: classObject.course_id} })"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small text fab v-bind="attrs" v-on="on" @click="onDelete(classObject)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <p>{{classObject.course_desc}}</p>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ClassListing",

  props: {
    classObject: Object
  },
  methods: {
    log(message) {
      console.log(message);
    },
    onDelete(course) {
      console.log("Emiting Delete for: " + course.course_name);
      this.$root.$emit("deleteCourse", course);
    }
  },
  computed: {
      wrappedName () {
        if (typeof (this.classObject.course_name) == "string") {
          if (this.classObject.course_name.length < 50) {
            return this.classObject.course_name;
          }
          else {
            return this.classObject.course_name.substring(0, 50) + "...";
          }
        }
        else {
          return "";
        }
      }
  }
};
</script>