<template>
  <q-page>
    <header>
      <h1>Gesuche</h1>
    </header>

    <body>
    <Request
      v-for="(request, idx) in requests"
      v-bind:key="idx"
      :user="{ firstName: 'Anonym', image: undefined }"
      :request="request"
      :onClick="openPopUp"/>
    <article v-if="requests.length === 0">Momentan gibt es keine Gesuche!</article>

    <q-dialog
      persistent
      v-model="isDialogOpen"
    >
      <q-card style="min-width: 350px">
<!--        <form className="offer-form">-->
<!--          <textarea-->
<!--            required-->
<!--            placeholder="Nachricht *"-->
<!--            onChange={ev => setOffer(ev.target.value)}-->
<!--              value={offer}-->
<!--              />-->
<!--          <Button type="button" isPrimary={true} size="small" onClick={sendOffer}>-->
<!--            Absenden-->
<!--          </Button>-->
<!--        </form>-->
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense autofocus rounded filled
            type="textarea"
            v-model="message"
            label="Nachricht"
            @keyup.enter="selectedRequest = undefined"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat color="secondary" icon="send" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
<!--        <button onClick={closeModal} className="close-modal">-->
<!--          X-->
<!--        </button>-->
<!--        {selectedRequest && <Offer requestId={selectedRequest} />}-->
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
  header
    text-align: center
    background: url('../statics/background.jpg') no-repeat
    background-size: cover
    padding: 50px
    color: white

    a
      text-decoration: none

    h4
      text-transform: uppercase
      margin: 0 0 30px 0

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

    article
      padding-top: 30px
      margin: 20px auto 0
      max-width: 800px

      h5
        color: $secondary
        text-transform: uppercase
        font-weight: 600
        margin: 20px 0
</style>

<script>
import Request from '../components/Request'
// import { callApi } from '../../api/requests'

export default {
  components: {
    Request
  },

  data () {
    return {
      requests: [],
      selectedRequest: undefined,
      message: '',
      isDialogOpen: false
    }
  },

  computed: {
    auth: {
      get () {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set (val) {
        this.$store.commit('auth/updateData', val)
      }
    }
  },

  mounted () {
    this.fetchRequests()
  },

  methods: {
    async fetchRequests () {
      try {
        // await callApi(
        //   this.$q.localStorage.getItem('server') + 'request',
        //   this.auth.token,
        //   {
        //     title: 'Kuchen für meinen Enkel',
        //     description: 'Ich traue mich nicht das Haus zu verlassen. Mein Enkel soll aber seinen Kuchen bekommen. Kann ihn jemand vorbei bringen? Er wohnt auch nur 5 Minuten entfernt.',
        //     category: '5e760820c8a4b63ee0c4cfba',
        //     'address.plz': '68199',
        //     'address.city': 'Mannheim',
        //     'address.street': 'Paul-Wittsack-Straße',
        //     'address.street_nr': '3',
        //     enddate: '2020-03-21T16:26:49.472Z'
        //   },
        //   'POST'
        // )
        // const result = await callApi(
        //   this.$q.localStorage.getItem('server') + 'publicRequest',
        //   this.auth.token
        // )
        // this.requests = result.result
        this.requests = [
          { title: 'help1', description: 'I need help', distance: '100m', category: { name: 'Kurierdienst' } },
          { title: 'help2', description: 'I need more help', distance: '100m', category: { name: 'Kurierdienst' } },
          { title: 'help3', description: 'I need even more help', distance: '100m', category: { name: 'Kurierdienst' } }
        ]
      } catch (err) {
        console.error(err)
      }
    },

    openPopUp (idx) {
      this.selectedRequest = idx
      this.isDialogOpen = true
    }
  }
}
</script>
