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
            <v-btn color="primary" :to="{ name: 'ViewCourse', params: { courseIndex: courseObject.course_id }}">Save</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ViewCourse",
    props: ['courseObject'],
    
    data: () => ({
        
    }),
}
</script>
