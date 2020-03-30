<template>
  <article class="request">
    <header>
        <span class="avatar">
            <img
              v-if="user.image"
              :src="user.image"
              :alt="'Foto von ' + user.firstName" />
            <span
              v-if="!user.image"
              class="placeholder">
              {{user.firstName[0]}}
            </span>
        </span>
      <div class="intro">
        <h2>{{request.title}}</h2>
        <sub>
          {{user.firstName}} wartet {{request.distance}} Meter entfernt auf deine Hilfe!
        </sub>
      </div>
      <button class="primary" onclick="onClick(request._id)">Helfen
      </button>
    </header>
    <p>
      <strong>Kategorie:</strong> {{request.category.name}}
    </p>
    <p>
      <strong>Gesuch:</strong> {{request.description}}
    </p>
  </article>
</template>

<style lang="sass" scoped>
  .request
    h2
      color: $secondary
      margin: 0
      flex-shrink: 1

    header
      align-items: center
      display: flex
      justify-content: flex-start
      text-align: center

    .avatar
      margin-right: 20px
      width: 80px
      height: 80px
      background: #ddd
      border-radius: 80px
      overflow: hidden
      flex-shrink: 0

    .placeholder
      font-size: 53px
      color: white

    .intro
      display: flex
      flex-direction: column
      text-align: left

    button
      margin-left: auto
</style>

<script>
export default {
  props: {
    user: Object,
    request: Object,
    onClick: Function
  }
}
</script>
