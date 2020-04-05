<template>
  <q-page style="justify-content: center; align-items: center; display: flex; padding: 20px;">
    <q-card style="width: 400px; padding: 15px 30px; border-radius: 25px">
      <div v-if="error" class="error">{{error}}</div>
      <h2>HILFE BEKOMMEN</h2>
      <h3>Wobei brauchen Sie Hilfe?</h3>
      <q-select
        dense filled
        v-model="category"
        :options="categories"
        label="Kategorie"></q-select>
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
        mask="##/##/####"
        label="Bis"
        class="input"
        :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date
                first-day-of-week="1"
                v-model="enddate"
                @input="() => $refs.qDateProxy.hide()"
                mask="DD-MM-YYYY"></q-date>
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
        color="secondary"
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
</style>

<script>
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
      categories: ['Kurierdienste', 'Bildung', 'Warenleistungen', 'Soziales & Gemeinschaft'],
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

  methods: {
    async send () {

    }
  }
}
</script>
