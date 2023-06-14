<template>
  <div>
    <Count />
    <hr />
    <Person />
  </div>
</template>

<script>
import Count from "./Count.vue";
import Person from "./Person.vue";

export default {
  name: "App",
  components: { Count, Person },
};
</script>