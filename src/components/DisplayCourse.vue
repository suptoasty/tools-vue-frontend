<template>
    <v-container>
        <v-row>
            <h1>{{ courseObject.course_name }}</h1>
        </v-row>
        <v-row>
            <v-col>
                Course name:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_name }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Number:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_num }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Description:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_desc }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Hours:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_hours }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Course Department:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_dept }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Class Level:
            </v-col>
            <v-col>
                <p>{{ courseObject.course_level }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color = "primary" :to="{ name: 'EditCourse', params: {courseIndex: courseObject.course_id, returnTo: 'ViewCourse'}}">Edit</v-btn>
            </v-col>
            <v-col>
                <v-btn color = "primary">Delete</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ViewCourse",
    props: ['courseObject', 'returnTo'],
    data: () => ({

    }),
}
/*
location.reload()
*/
</script>
