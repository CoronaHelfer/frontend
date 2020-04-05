export function setUser(state, data) {
  if (data) {
    state.user = {
      token: data.user.token,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      roleNames: data.user.roleNames
    }
  } else {
    state.user = null
  }
}
