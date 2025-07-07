<template>
  <div class="container">
    <h1>Departments</h1>

    <ul v-if="departments.length">
      <li v-for="(dept, index) in departments" :key="index">{{ dept }}</li>
    </ul>
    <p v-else>No departments found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: []
    };
  },
  methods: {
    loadDepartments() {
      const stored = localStorage.getItem('employees');
      if (stored) {
        const employees = JSON.parse(stored);
        const uniqueDepts = [...new Set(employees.map(emp => emp.department))];
        this.departments = uniqueDepts;
      }
    }
  },
  mounted() {
    this.loadDepartments();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  background: #f9fefb;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #d0f0c0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  font-weight: bold;
}
</style>
