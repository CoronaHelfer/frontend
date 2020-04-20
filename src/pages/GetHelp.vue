<template>
  <q-page style="justify-content: center; align-items: center; display: flex; padding: 20px">
    <q-card style="width: 400px; padding: 15px 30px; border-radius: 25px">
      <div v-if="error" class="error">{{error}}</div>
      <h2>HILFE BEKOMMEN</h2>
      <h3>Wobei brauchst du Hilfe?</h3>
      <q-select
        dense filled
        v-model="category"
        :options="categories"
        label="Kategorie"
        option-value="_id"
        option-label="name"
        map-options
      ></q-select>
      <h3>Details</h3>
      <q-input
        dense filled
        class="input"
        label="Titel"
        v-model="title"
      ></q-input>
      <q-input
        dense filled
        class="input"
        type="textarea"
        label="Beschreibung"
        v-model="description"
      ></q-input>
      <q-input
        dense filled
        v-model="enddate"
        label="Bis"
        class="input">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date
                first-day-of-week="1"
                v-model="enddate"
                @input="() => $refs.qDateProxy.hide()"
                mask="DD.MM.YYYY"></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <h3>Adresse</h3>
      <q-input
        dense filled
        class="input"
        label="Straße"
        v-model="street"
      ></q-input>
      <q-input
        dense filled
        class="input"
        type="number"
        label="Nummer"
        v-model="streetNumber"
      ></q-input>
      <q-input
        dense filled
        class="input"
        label="Stadt"
        v-model="city"
      ></q-input>
      <q-input
        dense filled
        class="input"
        type="number"
        label="Postleitzahl"
        v-model="zip"
      ></q-input>
      <h3>Hilfe für eine andere Person?</h3>
      <q-btn-toggle
        v-model="isHelpForElse"
        spread no-caps unelevated
        toggle-color="secondary"
        color="grey-3"
        text-color="primary"
        :options="[
          {label: 'Ja', value: true},
          {label: 'Nein', value: false}
        ]"
      ></q-btn-toggle>
      <q-btn
        rounded
        :loading="loading"
        label="Abschicken"
        class="full-width"
        style="margin-top: 15px"
        v-on:click="send()"></q-btn>
    </q-card>
  </q-page>
</template>

<style lang="sass" scoped>
  h3:first-of-type
    margin: 0 0 5px

  h3
    margin: 20px 0 0

  .input
    margin: 5px 0

  .error
    background: RED
    color: WHITE
    padding: 10px 25px
    margin-bottom: 15px
    border-radius: 19px !important
    font-size: 13px
</style>

<script>
import { callApi } from '../../api/requests'

export default {
  data () {
    return {
      error: false,
      loading: false,
      title: '',
      description: '',
      street: '',
      streetNumber: '',
      city: '',
      zip: '',
      categories: [],
      category: '',
      isHelpForElse: false,
      enddate: ''
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
    if (this.auth.authenticated) {
      this.loadCategories()
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    async loadCategories () {
      try {
        let categories = await fetch(this.$q.localStorage.getItem('server') + '/api/v1/category')
        categories = await categories.json()

        if (categories.error || !categories.result) {
          console.error('Error while fetching categories')
          throw new Error(this.$t('somethingWentWrong'))
        }

        this.categories = categories.result
        this.category = categories.result[0]._id
      } catch (e) {
        this.error = e
      }
    },

    async send () {
      try {
        this.loading = true
        if (
          this.title === '' ||
          this.description === '' ||
          this.zip === '' ||
          this.city === '' ||
          this.street === '' ||
          this.streetNumber === ''
        ) {
          throw new Error(this.$t('missingFields'))
        }

        const [day, month, year] = this.enddate.split('.')
        const res = await callApi(
          this.$q.localStorage.getItem('server') + '/api/v1/'request',
          this.auth.token,
          {
            title: this.title,
            description: this.description,
            category: this.category,
            'address.plz': this.zip,
            'address.city': this.city,
            'address.street': this.street,
            'address.street_nr': this.streetNumber,
            time_end: month + '/' + day + '/' + year
          },
          'POST'
        )

        if (res.error) {
          console.error('Error while creating request.')
          throw new Error(this.$t('somethingWentWrong'))
        }

        this.loading = false
        this.$router.push('/profile/requests')
      } catch (e) {
        this.loading = false
        this.error = e
      }
    }
  }
}
</script>
