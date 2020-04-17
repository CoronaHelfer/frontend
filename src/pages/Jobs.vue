<template>
  <q-page>
    <div class="title">
      <h1>{{$t('jobsHeader')}}</h1>
    </div>
    <body>
      <article>
        <h2>{{$t('jobsFeDev')}}</h2>
        <strong>{{$t('jobsQualifications')}}:</strong> Vue.js + Quasar
        <p>{{$t('jobsLocation')}}</p>

        <h2>{{$t('jobsBeDev')}}</h2>
        <strong>{{$t('jobsQualifications')}}:</strong> Node.js + Swagger
        <p>{{$t('jobsLocation')}}</p>

        <h2>{{$t('jobsContact1')}}</h2>
        {{$t('jobsContact2')}}: <a href="mailto:info@coronahelfer.eu">info@coronahelfer.eu</a>
      </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
.title
  margin-top: 75px
  text-align: center
  background: url('../statics/images/Banner-Jobs.png') no-repeat
  background-size: 100%
  color: white
  height: 450px
  h1
    padding: 298px 676px 56px 404px
    color: white

body
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
