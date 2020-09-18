<template>
    <div>
        <p>class index {{$route.params.courseIndex}}</p>
        <p>Class name: {{coursesObject[$route.params.courseIndex].course_name}}</p>
    </div>
</template>

<script>
export default {
    name: "ViewCourse",
    props: {
        coursesObject: Array
    },
    data: () => ({

    })
}
</script>
