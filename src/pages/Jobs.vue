<template>
  <q-page>
    <header>
      <h1>Jobs</h1>
    </header>
    <body>
    <article>
      <h2>Diensteanbieter</h2>
    </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
  header
    text-align: center
    padding: 50px
    color: white
    height: 4px

  body
    &:before
      background-color: white
      border-radius: 100%
      content: ''
      height: 50px
      position: absolute
      top: -25px
      width: 100%

    background-color: white
    position: relative
    padding-bottom: 100px

    article
      padding-top: 30px
      margin: 20px auto 0
      max-width: 800px

      strong
        color: $secondary
</style>

<script>
export default {
}
</script>
