<template>
  <div>
    <q-btn
      v-if="!auth.authenticated"
      to="/login"
      class="rounded q-mr-md"
      size="md"
    >
      <span v-if="$q.screen.gt.xs" class="q-mr-md">Login</span>
      <q-icon name="fas fa-user" />
    </q-btn>

    <q-btn-dropdown
      v-if="auth.authenticated"
      :label="auth.firstName + ' ' + auth.lastName"
      class="rounded q-mr-md"
    >
      <q-list dark dense class="bg-grey-10">
        <q-item clickable v-close-popup @click="$router.push('/profile')">
          <q-item-section>
            <q-item-label>{{ $t('profile') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="logout()">
          <q-item-section>
            <q-item-label>{{ $t('logout') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<style lang="sass" scoped>
.rounded
  border-radius: 20px

.q-icon
  font-size: 1em

.q-menu
  background: none

.q-item
  text-transform: uppercase
</style>

<script>
import { clone } from 'ramda'

export default {
  data() {
    return {
      open: false
    }
  },

  computed: {
    auth: {
      get() {
        return clone(this.$store.state.auth)
      }
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$q.sessionStorage.clear()
      this.$q.localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
