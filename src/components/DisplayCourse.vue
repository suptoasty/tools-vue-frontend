<template>
    <div>
        <p>class index {{$route.params.courseIndex}}</p>
        <p>Class name: {{courseObject.course_name}}</p>
    </div>
</template>

<script>
export default {
    name: "ViewCourse",
    props: ['courseObject'],
    data: () => ({

    }),
}
</script>
