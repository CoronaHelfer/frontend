<template>
  <q-page>
    <header>
      <h1>{{$t('profile')}}</h1>
    </header>

    <body>
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

  .q-btn
    background: white
    border: 0
    border-radius: 19px
    color: $secondary
    cursor: pointer
    font-size: 20px
    font-weight: 400
    padding: 0 50px
    text-transform: uppercase

    &:focus
      outline: none

    &.primary
      background: $secondary
      color: white

    &.small
      height: 30px
      line-height: 30px
      padding: 0 30px
      font-size: 15px
      font-weight: 600
      margin-top: 15px

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
</style>

<script>
export default {
}
</script>
