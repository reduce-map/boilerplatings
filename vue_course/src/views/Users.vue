<template>
  <div class="row">
    <div class="col-12">
      <h2>Список пользователей</h2>
    </div>

    <div class="row">
      <div class="col-12">
        Пользователей в базе - {{users}}
      </div>

      <table class="table">
        <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr>
        <tr>
          <td>Mary</td>
          <td>Moe</td>
          <td>mary@example.com</td>
        </tr>
        <tr>
          <td>July</td>
          <td>Dooley</td>
          <td>july@example.com</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// export default {
//
// }
</script>

<style scoped>
</style>
