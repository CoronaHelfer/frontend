<template>
  <q-card class="card bg-red-1">
    <q-card-section>
      <div class="row">
        <div class="col">
          <header>
            <h2>{{request.title}}</h2>
          </header>
          <p>
            <strong>{{$t('category')}}:</strong> {{request.category.name}}
          </p>
          <p>
            <strong>{{$t('request')}}:</strong> {{request.description}}
          </p>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item>
                  <q-btn
                    icon-right="fas fa-pencil-alt"
                    label="Bearbeiten"
                    class="full-width"></q-btn>
                </q-item>
                <q-item>
                  <q-btn
                    icon-right="fas fa-trash"
                    label="Löschen"
                    class="full-width"></q-btn>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      {{request.time_end}}
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
header
  align-items: center
  display: flex
  justify-content: flex-start
  text-align: center

.intro
  display: flex
  flex-direction: column
  text-align: left

.card
  border-radius: 10px
  padding: 20px
  margin: 20px 40px

h2, strong
  color: $primary

.q-item
  padding: 0
</style>

<script>
export default {
  props: {
    request: Object
  }
}
</script>
