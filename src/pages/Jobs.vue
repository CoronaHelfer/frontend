<template>
  <q-page>
    <div class="title">
    </div>
    <article>
      <div>
        <h3>Reinschauen lohnt sich:</h3>
        <h1>Wir suchen Verstärkung</h1>
      </div>

      <h2>{{$t('jobsFeDev')}}</h2>
      <strong>{{$t('jobsQualifications')}}:</strong> Vue.js + Quasar
      <p>{{$t('jobsLocation')}}</p>

      <h2>{{$t('jobsBeDev')}}</h2>
      <strong>{{$t('jobsQualifications')}}:</strong> Node.js + Swagger
      <p>{{$t('jobsLocation')}}</p>

      <h2>{{$t('jobsContact1')}}</h2>
      {{$t('jobsContact2')}}: <a href="mailto:info@coronahelfer.eu">info@coronahelfer.eu</a>
    </article>
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

/*body*/
/*  background-color: white*/
/*  position: relative*/
/*  padding-bottom: 20px*/
/*  min-height: calc(100vh - 340px)*/
article
  padding-top: 30px
  margin: -450px auto 0
  max-width: 800px
  h3
    padding-top: 220px
    color: white
    text-align: left
  h1
    margin-top: -20px
    color: white
    font-weight: bold
    font-size: 70px
    line-height: 96px
    text-align: left

h2
  margin-top: 40px
</style>

<script>
export default {
}
</script>
