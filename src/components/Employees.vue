<template>
  <div class="container">
    <h1>Employee Management</h1>

    <!-- Form -->
    <form @submit.prevent="isEditing ? updateEmployee() : addEmployee()" class="form">
      <input v-model="id" placeholder="Employee ID" required :disabled="isEditing" />
      <input v-model="name" placeholder="Name" required />
      <input v-model="position" placeholder="Position" required />
      <input v-model="department" placeholder="Department" required />
      <button type="submit">{{ isEditing ? 'Update' : 'Add' }} Employee</button>
      <button v-if="isEditing" type="button" class="cancel-btn" @click="cancelEdit">Cancel</button>
    </form>

    <!-- Search -->
    <input
      v-model="searchText"
      placeholder="Search by name..."
      class="search-box"
    />

    <!-- Employee Table -->
    <table v-if="filteredEmployees.length" class="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emp, index) in filteredEmployees" :key="index">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>
            <button class="edit-btn" @click="editEmployee(index)">Edit</button>
            <button class="delete-btn" @click="deleteEmployee(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">No employees to show.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      name: '',
      position: '',
      department: '',
      searchText: '',
      employees: [],
      isEditing: false,
      editingIndex: null
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((emp) =>
        emp.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    addEmployee() {
      const exists = this.employees.some(emp => emp.id === this.id.trim());
      if (exists) {
        alert('Employee ID already exists!');
        return;
      }

      this.employees.push({
        id: this.id.trim(),
        name: this.name.trim(),
        position: this.position.trim(),
        department: this.department.trim()
      });

      this.saveToLocal();
      this.resetForm();
    },
    editEmployee(index) {
      const emp = this.employees[index];
      this.id = emp.id;
      this.name = emp.name;
      this.position = emp.position;
      this.department = emp.department;
      this.isEditing = true;
      this.editingIndex = index;
    },
    updateEmployee() {
      if (this.editingIndex !== null) {
        this.employees[this.editingIndex] = {
          id: this.id.trim(),
          name: this.name.trim(),
          position: this.position.trim(),
          department: this.department.trim()
        };
        this.saveToLocal();
        this.resetForm();
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    deleteEmployee(index) {
      this.employees.splice(index, 1);
      this.saveToLocal();
    },
    saveToLocal() {
      localStorage.setItem('employees', JSON.stringify(this.employees));
    },
    loadFromLocal() {
      const data = localStorage.getItem('employees');
      if (data) {
        this.employees = JSON.parse(data);
      }
    },
    resetForm() {
      this.id = '';
      this.name = '';
      this.position = '';
      this.department = '';
      this.isEditing = false;
      this.editingIndex = null;
    }
  },
  mounted() {
    this.loadFromLocal();
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background: #f9fbfd;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
}

h1 {
  text-align: center;
  color: #003366;
  margin-bottom: 25px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.form input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1 1 180px;
}

.form button {
  padding: 10px 18px;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.form button:hover {
  background-color: #005fa3;
}

.cancel-btn {
  background-color: #888;
  color: white;
  margin-left: 10px;
}

.cancel-btn:hover {
  background-color: #666;
}

.search-box {
  display: block;
  margin: 10px auto 20px auto;
  padding: 8px 12px;
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.employee-table th,
.employee-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.employee-table th {
  background-color: #e6f0ff;
  color: #003366;
}

.employee-table tr:hover {
  background-color: #f1f9ff;
}

.delete-btn,
.edit-btn {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.delete-btn {
  background-color: #cc0000;
}

.delete-btn:hover {
  background-color: #a30000;
}

.edit-btn {
  background-color: #28a745;
}

.edit-btn:hover {
  background-color: #218838;
}

.no-data {
  text-align: center;
  color: gray;
  font-style: italic;
  margin-top: 20px;
}
</style>
