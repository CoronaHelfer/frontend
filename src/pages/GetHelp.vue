<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="wrapper">
      <div v-if="error" class="error">{{ error }}</div>
      <h1 class="q-px-lg uppercase">{{ $t('getHelp') }}</h1>

      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        alternative-labels
        active-color="secondary"
        inactive-color="primary"
      >
        <q-step :name="1" :title="$t('yourMessage')" label="1" :done="step > 1">
          <h3>{{ $t('questionHelp') }}</h3>
          <div class="row justify-center items-center">
            <q-select
              class="form-input q-pr-md col-xs-12 col-md-4"
              filled
              v-model="category"
              :options="categories"
              :label="$t('category')"
              option-value="_id"
              option-label="name"
              map-options
              bg-color="accent"
            ></q-select>
            <q-input
              filled
              class="form-input q-pr-md col-xs-12 col-md-4"
              :label="$t('title')"
              v-model="title"
              bg-color="accent"
            />
            <q-input
              class="q-pr-sm form-input-date form-input col-xs-12 col-md-2"
              filled
              v-model="startdate"
              mask="date"
              :rules="['date']"
              :label="$t('startdate')"
              bg-color="accent"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              class="q-pl-sm form-input-date form-input col-xs-12 col-md-2"
              filled
              v-model="enddate"
              mask="date"
              :rules="['date']"
              :label="$t('enddate')"
              bg-color="accent"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              dense
              filled
              class="form-input col-xs-12 col-md-12"
              type="textarea"
              :label="$t('description')"
              v-model="description"
              bg-color="accent"
            ></q-input>
          </div>
        </q-step>

        <q-step
          :name="2"
          :title="$t('yourAddress')"
          icon="home"
          :done="step > 2"
        >
          <h3>{{ $t('yourAddress') }}</h3>

          <div class="row">
            <q-input
              filled
              class="form-input col-xs-12 col-md-10"
              :label="$t('street')"
              v-model="street"
              bg-color="accent"
            />
            <q-input
              filled
              class="q-pl-md form-input col-xs-12 col-md-2"
              :label="$t('streetNumber')"
              v-model="streetNumber"
              bg-color="accent"
            />
            <q-input
              filled
              class="q-pr-md form-input col-xs-12 col-md-2"
              :label="$t('zip')"
              v-model="zip"
              bg-color="accent"
            />
            <q-input
              filled
              class="form-input col-xs-12 col-md-10"
              :label="$t('city')"
              v-model="city"
              bg-color="accent"
            />
          </div>

          <h3>{{ $t('helpOthers') }}</h3>

          <div class="row">
            <q-btn-toggle
              class="form-input col-xs-12"
              v-model="isHelpForElse"
              spread
              no-caps
              toggle-color="secondary"
              color="white"
              text-color="black"
              :options="[
                { label: $t('yes'), value: true },
                { label: $t('no'), value: false }
              ]"
            />
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 2 ? $t('send') : $t('continue')"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              :label="$t('back')"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.q-stepper
  box-shadow: 0 0
  border-radius: 0
  background: #fff

.form-input-date
  padding-bottom: 0

.error
  background: RED
  color: WHITE
  padding: 10px 25px
  margin-bottom: 15px
  font-size: 13px
</style>

<script>
import { callApi } from '../../api/requests'

export default {
  data() {
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
      isHelpForElse: true,
      startdate: '',
      enddate: '',
      step: 1
    }
  },

  computed: {
    auth: {
      get() {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set(val) {
        this.$store.commit('auth/updateData', val)
      }
    }
  },

  mounted() {
    if (this.auth.authenticated) {
      this.loadCategories()
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    async loadCategories() {
      try {
        let categories = await fetch(
          this.$q.localStorage.getItem('server') + '/api/v1/category'
        )
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

    async send() {
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
          this.$q.localStorage.getItem('server') + '/api/v1/request',
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
