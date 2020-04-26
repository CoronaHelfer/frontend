<template>
  <div>
    <q-btn
      v-if="!auth.authenticated"
      to="/login"
      class="rounded"
      label="Login"
      size="md"
    >
      <q-icon right size="1em" name="fas fa-user" />
    </q-btn>

    <q-btn-dropdown
      v-if="auth.authenticated"
      :label="auth.firstname + ' ' + auth.lastname"
      class="rounded"
    >
      <q-list dark dense class="bg-grey-10">
        <q-item clickable v-close-popup @click="$router.push('/profile')">
          <q-item-section>
            <q-item-label>{{$t('profile')}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="logout()">
          <q-item-section>
            <q-item-label>{{$t('logout')}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<style lang="sass" scoped>
.rounded
  padding: 0 10px
  border-radius: 10px

  button
    padding: 0
    margin: 0
    background-color: transparent
    color: WHITE
    border: 0
    font-size: 15px

.q-icon
  font-size: 1em

.q-menu
  background: none

.q-item
  text-transform: uppercase
</style>

<script>
export default {
  data() {
    return {
      open: false
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

  methods: {
    logout() {
      this.auth = {
        token: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        picture: '',
        createdAt: '',
        updatedAt: '',
        authenticated: false
      }
      this.$q.sessionStorage.clear()
      this.$q.localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
