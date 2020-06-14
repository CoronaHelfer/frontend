<template>
  <article class="request">
    <q-card class="request-card" flat bordered>
      <div class="row">
        <div class="col-12">
          <q-card-section horizontal>
            <q-card-section class="q-pt-sm section-inner">
              <div class="row">
                <div class="col"><h2>{{ request.title }}</h2></div>
                <div class="col date-range">
                  {{ format(new Date(request.time_start), 'dd/MM/yyyy') }}
                  - {{ format(new Date(request.time_end), 'dd/MM/yyyy') }}
                </div>
              </div>
              <h3>{{ $t(`categoryNameByInternalId.${request.category.internal_id}`) }}</h3>
              <div>
                {{ request.description }}
              </div>
            </q-card-section>
          </q-card-section>
          <q-card-actions>
            <div class="distance" v-if="request.distance">
              {{ $t('approximateDistance') }}: {{ request.distance }}m
            </div>
            <q-space></q-space>
            <q-btn
              class="card-action-button"
              color="secondary"
              @click="onClick(request._id)"
            >
              {{ $t('help') }}
            </q-btn>
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </article>
</template>

<style lang="sass" scoped>
.request-card
  background-color: $tertiary
  border: none
  .avatar
    margin: 16px
  .card-action-button
    margin: 8px
  .section-inner
    width: 100%
    height: 100%
    .date-range
      text-align: right
      padding: 12px
      color: $secondary
  .distance
    position: absolute
    bottom: 10px
    left: 16px
    font-size: 14px
</style>

<script>
import { format } from 'date-fns'
import { clone } from 'ramda'

export default {
  props: {
    user: Object,
    request: Object,
    onClick: Function
  },

  computed: {
    auth: {
      get() {
        return clone(this.$store.state.auth)
      }
    }
  },

  methods: {
    format
  }
}
</script>
