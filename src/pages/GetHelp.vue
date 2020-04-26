<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="wrapper">
      <div v-if="error" class="error">{{ error }}</div>
      <h1 class="q-px-lg uppercase">{{ $t('getHelp') }}</h1>
      <q-form>
        <q-stepper
          v-model="step"
          ref="stepper"
          animated
          alternative-labels
          active-color="secondary"
          inactive-color="primary"
        >
          <q-step
            :name="1"
            :title="$t('yourMessage')"
            label="1"
            :done="step > 1"
          >
            <h3>{{ $t('questionHelp') }}</h3>
            <div class="row justify-center items-center">
              <q-select
                id="categories"
                class="form-input q-pr-md col-xs-12 col-md-3"
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
                name="title"
                class="form-input q-pr-sm col-xs-12 col-md-3"
                :label="$t('title')"
                v-model="title"
                bg-color="accent"
                lazy-rules
                :rules="[(val) => !!val || this.$t('emptyField')]"
              />
              <q-input
                class="q-pr-sm form-input col-xs-12 col-md-3"
                filled
                name="startdate"
                v-model="startdate"
                lazy-rules
                :rules="['datetime', checkDate]"
                :label="$t('startdate')"
                bg-color="accent"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qStartDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <div class="q-gutter-md row">
                        <q-date
                          mask="YYYY-MM-DDTHH:mm:ss"
                          v-model="startdate"
                          :rules="['datetime']"
                          color="secondary"
                          :options="fromToday"
                        />
                        <q-time
                          v-model="startdate"
                          mask="YYYY-MM-DDTHH:mm:ss"
                          :rules="['datetime']"
                          color="secondary"
                          @input="$refs.qStartDateProxy.hide()"
                        />
                      </div>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                class="q-pl-sm form-input col-xs-12 col-md-3"
                filled
                v-model="enddate"
                name="enddate"
                lazy-rules
                :rules="['datetime', checkDate, checkEndDate]"
                :label="$t('enddate')"
                bg-color="accent"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="endDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <div class="q-gutter-md row">
                        <q-date
                          mask="YYYY-MM-DDTHH:mm:ss"
                          v-model="enddate"
                          color="secondary"
                          :rules="['datetime']"
                          :options="fromToday"
                        />
                        <q-time
                          v-model="enddate"
                          mask="YYYY-MM-DDTHH:mm:ss"
                          :rules="['datetime']"
                          color="secondary"
                          @input="$refs.endDateProxy.hide()"
                        />
                      </div>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                dense
                filled
                class="form-input col-xs-12 col-md-12"
                type="textarea"
                name="description"
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
                type="number"
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
              <div class="row justify-between">
                <q-btn
                  v-if="step > 1"
                  flat
                  @click="$refs.stepper.previous()"
                  :label="$t('back')"
                />
                <q-space v-else />
                <q-btn
                  :loading="loading"
                  @click.prevent="step === 2 ? send() : $refs.stepper.next()"
                  color="primary"
                  :label="step === 2 ? $t('send') : $t('continue')"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.q-stepper
  box-shadow: 0 0
  border-radius: 0
  background: #fff

.error
  background: RED
  color: WHITE
  padding: 10px 25px
  margin-bottom: 15px
  font-size: 13px
</style>

<script>
import { callApi } from '../../api/requests'
import { date } from 'quasar'
import { parse } from 'date-fns'

export default {
  data() {
    const now = Date.now()
    const defaultDate = date.formatDate(now, 'DD/MM/YYYY HH:mm')
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
      startdate: defaultDate,
      enddate: defaultDate,
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
        const start = parse(this.startdate, 'dd/MM/yyyy HH:mm')
        const end = parse(this.enddate, 'dd/MM/yyyy HH:mm')
        const startDate = date.formatDate(start, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        const endDate = date.formatDate(end, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        const res = await callApi(
          '/request',
          this.auth.token,
          {
            title: this.title,
            description: this.description,
            category: this.category,
            'address.plz': this.zip,
            'address.city': this.city,
            'address.street': this.street,
            'address.street_nr': this.streetNumber,
            time_start: startDate,
            time_end: endDate
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
    },

    fromToday(date) {
      return date >= date.formatDate(new Date(), 'DD/MM/YYYY')
    },

    checkDate(inputDate) {
      const parsedInputDate = parse(inputDate, 'dd/MM/yyyy HH:mm', new Date())
      if (
        !date.isValid(parsedInputDate) ||
        inputDate.length < 'dd/MM/yyyy HH:mm'.length
      ) {
        return this.$t('errorDate')
      }
    },

    checkEndDate(endDate) {
      const parsedEndDate = parse(endDate, 'dd/MM/yyyy HH:mm', new Date())
      if (
        parse(this.startdate, 'dd/MM/yyyy HH:mm', new Date()) > parsedEndDate
      ) {
        return this.$t('errorEndDate')
      }
    }
  }
}
</script>
