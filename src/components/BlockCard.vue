<template>
  <div class="block-card">
    <div class="card-profile">
      <img src="../statics/icons/user.svg" alt="profile-image" class="profile-image" />
    </div>
    <div class="block-card-wrapper">
      <div class="card-header">
        <div class="card-title">
          <h1 class="title">Wöchentlicher Einkauf</h1>
          <p class="kategorie">Warenleistung</p>
        </div>
        <div class="card-date">
          <h1 class="date">30.04.2020</h1>
        </div>
      </div>
      <div class="card-body">
        <p
          class="card-description"
        >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.block-card {
  width: 100%;
  height: auto;
  padding: 25px;
  background-color: $tertiary;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  .card-profile {
    width: 100px;
    height: 100px;
    background-color: #ffffff;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px;
    border-bottom-right-radius: 50px;
    overflow: hidden;
    .profile-image {
      width: 100%;
      height: 100%;
    }
  }
  .block-card-wrapper {
    margin-left: 100px;
    .card-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .card-title {
        .title {
          text-transform: capitalize;
          margin: 0px;
          line-height: inherit;
          font-size: 20px;
          font-weight: bold;
          color: $primary;
        }
        .kategorie {
          text-transform: uppercase;
          margin: 0px;
          line-height: inherit;
          font-size: 16px;
          color: $primary;
        }
      }
      .card-date {
        .date {
          text-transform: capitalize;
          margin: 0px;
          line-height: inherit;
          font-size: 20px;
          font-weight: bold;
          color: $secondary;
        }
      }
    }
    .card-body {
      width: 90%;
      margin-top: 10px;
    }
  }
}
</style>
