<template>
  <q-page>
    <header>
      <h1>Become part of the team</h1>
    </header>
    <body>
      <article>
        <h2>Frontend Developer</h2>
        <p><strong>Qualifications:</strong> Vue.js + Quasar</p>
        <p>You can work from anywhere in the world.</p>

        <h2>Backend Developer</h2>
        <strong>Qualifications:</strong> Node.js + Swagger
        <p>You can work from anywhere in the world.</p>

        <h2>Sounds intereting?</h2>
        Get in touch: <a href="mailto:info@coronahelfer.eu">info@coronahelfer.eu</a>
      </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
header
  text-align: center
  background: url('../statics/images/background.jpg') no-repeat
  background-size: cover
  padding: 50px
  color: white

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
  padding-bottom: 20px
  min-height: calc(100vh - 340px)

  article
    padding-top: 30px
    margin: 20px auto 0
    max-width: 800px

h2
  margin-top: 40px
</style>

<script>
export default {
}
</script>
