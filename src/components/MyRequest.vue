<template>
  <article class="request">
    <header>
      <h2>{{request.title}}</h2>
    </header>
    <p>
      <strong>Kategorie:</strong> {{request.category.name}}
    </p>
    <p>
      <strong>Gesuch:</strong> {{request.description}}
    </p>
  </article>
</template>

<style lang="sass" scoped>
h2
  color: $secondary
  margin: 0
  flex-shrink: 1

header
  align-items: center
  display: flex
  justify-content: flex-start
  text-align: center

.intro
  display: flex
  flex-direction: column
  text-align: left
</style>

<script>
export default {
  props: {
    request: Object
  }
}
</script>
