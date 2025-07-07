<template>
  <div>
    <nav>
      <router-link to="/">Employees</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/departments">Departments</router-link>
    </nav>

    <router-view /> <!-- Show the current page -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* You can keep global navbar styles here or in style.css */
</style>
