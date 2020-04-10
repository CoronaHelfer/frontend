<template>
  <div>
    <q-btn
      v-if="!auth.authenticated"
      to="/login"
      class="login-btn"
      label="Login"
    />

    <li v-if="auth.authenticated" class="menu-btn" v-on:click="open = !open">
      <span>{{ auth.firstname }} {{ auth.lastname }}</span>
      <q-icon
        :name="open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
      ></q-icon>
      <ul :class="open ? '' : 'hidden'">
        <li v-on:click="$router.push('/profile')">PROFIL</li>
        <li v-on:click="$router.push('/profile/requests')">MEINE ANZEIGEN</li>
        <li v-on:click="logout()">ABMELDEN</li>
      </ul>
    </li>
  </div>
</template>

<style lang="sass" scoped>
.login-btn
  background-color: $secondary
  padding: 3px 20px
  border-radius: 20px
  font-weight: 600
  font-size: 15px

  button
    padding: 0
    margin: 0
    background-color: transparent
    color: WHITE
    border: 0
    font-size: 15px

.menu-btn
  background-color: $secondary
  padding: 6px 20px
  border-radius: 20px
  font-weight: 600
  font-size: 15px
  display: flex
  justify-content: space-between
  align-items: center
  box-sizing: border-box
  cursor: pointer
  ul
    z-index: 15
    position: absolute
    background-color: $primary
    list-style-type: none
    flex-direction: column
    top: 0
    right: 0
    margin-top: 80px
    margin-right: 15px
    display: flex
    padding: 3px 3px
    border-radius: 20px
    font-weight: 600
    font-size: 15px
    width: 200px
    box-sizing: border-box
    li
      text-align: left
      margin-left: 0
      padding: 10px 32px
      border-radius: 20px
      cursor: pointer
      a
        text-decoration: none
        color: white
      &:hover
        background-color: $secondary
    &.hidden
      display: none
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
      this.$router.push('/login')
    }
  }
}
</script>
