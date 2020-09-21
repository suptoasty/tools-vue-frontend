<template>
    <v-container>
        <v-row>
            <h1>Add Course</h1>
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
    methods:{
        addClass(){
            let courseObject = {
                course_name: {}, 
                course_dept: {},
                course_num: {},
                course_level: {},
                course_hours: {},
                course_desc: {}
            };
            courseObject.course_name = this.course_name;
            courseObject.course_dept = this.course_dept;
            courseObject.course_num = this.course_num;
            courseObject.course_level = this.course_level;
            courseObject.course_hours = this.course_hours;
            courseObject.course_desc = this.course_desc;
            CourseService.postCourse(courseObject)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log("There was an error" + error.response)
            });
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