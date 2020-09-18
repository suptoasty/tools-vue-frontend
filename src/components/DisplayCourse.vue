<template>
    <div>
        <p>hello {{courseObject[0].course_name}}</p>
        <p>a class: {{coursesObject[0].course_name}}</p>
    </div>
</template>

<script>
export default {
    name: "ViewCourse",
    props: {
        courseObject: Array,
        coursesObject: Array
    },
    data: () => ({

    })
}
</script>
