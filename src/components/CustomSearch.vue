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
  font-size: 44px;
  color: $secondary;
}
.regionale-suche-input {
  margin-top: 50px;
  background-color: $inputcolor;
  padding: 15px;
  font-size: 20px;
  color: $secondary;
}
::placeholder {
  font-size: 20px;
  color: $secondary;
}
</style>
