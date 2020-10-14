<template>
  <div>
    <p>{{index}}</p>
    <p>{{returnTo}}</p>
    <p>{{isAdd}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  props: {
    index: {
      default: undefined,
    },
    returnTo: {
      type: String,
      default: undefined,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
};
</script>