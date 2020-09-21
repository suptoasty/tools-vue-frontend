<template>
    <v-container>
        <v-row>
            <h1>Edit Course</h1>
        </v-row>
        <v-row>
            <v-col>
                Course name:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_name"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Number:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_num"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Description:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_desc"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Hours:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_hours"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Department:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_dept"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Class Level:
            </v-col>
            <v-col>
                <v-text-field
                v-model="course_level"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-btn v-on:click.native = "addClass" color="primary" :to="{ name: 'Home'}">Add</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import CourseService from "@/services/CourseService.js";
export default {
    name: "AddCourse",
    props: ['courseObject'],
    methods:{
        addClass(){
            console.log("button clicked");
            console.log(this.course_num);
            console.log(this.course_name);
            CourseService.postCourse(this.courseObject);
        }
    },
    data: () => ({
        course_name: "",
        course_dept: "",
        course_num: "",
        course_level: "",
        course_hours: "",
        course_desc: ""
    }),
}
</script>