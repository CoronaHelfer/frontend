<template>
  <article class="request">
    <q-card class="request-card" flat bordered>
      <div class="row">
        <div class="col-1">
          <q-avatar
            class="avatar"
            v-if="request.created_by.picture"
          >
            <img
              :src="request.created_by.picture"
              :alt="'Foto von ' + user.firstName"
            />
          </q-avatar>
        </div>
        <div class="col-11">
          <q-card-section horizontal>
            <q-card-section class="q-pt-sm">
              <h2>{{request.title}}</h2>
              <h3>{{request.category.name}}</h3>
              <div>
                {{request.description}}
              </div>
            </q-card-section>
          </q-card-section>
          <q-card-actions>
            <q-space></q-space>
            <q-btn
              class="card-action-button"
              color="secondary"
              v-on:click="onClick($vnode.key)"
            >
              {{$t('help')}}
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
