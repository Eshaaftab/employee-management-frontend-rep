<template>
  <div class="container">
    <h1>Dashboard</h1>

    <div class="stats">
      <p>Total Employees: <strong>{{ totalEmployees }}</strong></p>
      <p>Total Departments: <strong>{{ totalDepartments }}</strong></p>
    </div>

    <button @click="showEmployees">Show All Employees</button>
    <button @click="showDepartments">Show Departments</button>

    <div class="output">
      <ul v-if="outputList.length">
        <li v-for="(item, index) in outputList" :key="index">{{ item }}</li>
      </ul>
      <p v-else>No data to show.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      outputList: [],
    };
  },
  computed: {
    totalEmployees() {
      return this.employees.length;
    },
    totalDepartments() {
      const uniqueDepts = new Set(this.employees.map(emp => emp.department));
      return uniqueDepts.size;
    }
  },
  methods: {
    loadEmployees() {
      const stored = localStorage.getItem('employees');
      if (stored) {
        this.employees = JSON.parse(stored);
      }
    },
    showEmployees() {
      this.outputList = this.employees.map(emp => `${emp.name} - ${emp.position}`);
    },
    showDepartments() {
      const depts = [...new Set(this.employees.map(emp => emp.department))];
      this.outputList = depts;
    }
  },
  mounted() {
    this.loadEmployees();
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  padding: 30px;
  background: #f5faff;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  text-align: center;
}

.stats {
  margin-bottom: 20px;
}

button {
  margin: 5px;
  padding: 10px 18px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}

.output {
  margin-top: 20px;
}

.output ul {
  text-align: left;
  padding: 0;
}

.output li {
  background: #e6f2ff;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
}
</style>
