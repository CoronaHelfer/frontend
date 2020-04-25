<template>
  <q-input
    class="regionale-suche-input"
    :placeholder="$t('searchRegion')"
    ref="input"
    v-model="region"
  >
    <template v-slot:append>
      <q-icon class="room-icon" name="room" />
    </template>
  </q-input>
</template>
<!-- <q-input ref="input" filled v-model="region" :label="$t('searchRegion')">
<template v-slot:append>
    <q-icon class="icon" name="room" />
</template>
</q-input> -->

<script>
export default {}
</script>

<style lang="scss">
.room-icon {
  font-size: 2rem;
  color: $secondary;
}
.regionale-suche-input {
  margin-top: 4%;
  background-color: $inputcolor;
  padding: 2%;
  font-size: 1rem;
  color: $secondary;
}
::placeholder {
  font-size: 1rem;
  color: $secondary;
}
</style>
