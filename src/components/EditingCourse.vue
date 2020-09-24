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
                v-model = "courseObject.course_name"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Number:
            </v-col>
            <v-col>
                <v-text-field
                v-model="courseObject.course_num"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Description:
            </v-col>
            <v-col>
                <v-text-field
                v-model = "courseObject.course_desc"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Hours:
            </v-col>
            <v-col>
                <v-text-field
                v-model = "courseObject.course_hours"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Department:
            </v-col>
            <v-col>
                <v-text-field
                v-model = "courseObject.course_dept"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Class Level:
            </v-col>
            <v-col>
                <v-text-field
                v-model = "courseObject.course_level"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn v-on:click.native = "saveClass" color="primary">Save</v-btn>
            </v-col>
            <v-col>
                <v-btn color="primary" :to="{ name: 'ViewCourse', params: { courseIndex: courseObject.course_id }}">Cancel</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CourseService from "@/services/CourseService.js";
import router from "@/router/index.js";
export default {
    name: "EditCourse",
    props: ['courseObject'],
    methods:{
        saveClass(){
            console.log("button clicked");
            console.log(this.courseObject.course_id);
            console.log(this.courseObject);
            CourseService.putCourse(this.courseObject.course_id, this.courseObject)
            .then( () => {
                router.push({ name: 'ViewCourse', params: { courseIndex: this.courseObject.course_id }});
            })
            .catch(error => {
                console.log("Save class error: " + error.response);
            });
        }
    },
    data: () => ({
        
    }),
}
</script>
