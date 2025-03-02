<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPersonsList, type Person } from "../services/personsApiService.ts";

const persons = ref<Person[]>([]); // Store fetched persons
const errorFetching = ref(false);
const loading = ref(true);

// (TODO: add page functionality)
onMounted(async () => {
  try {
    persons.value = await getPersonsList(10, 0);
  } catch (error) {
    errorFetching.value = true;
  }
  loading.value = false;
});
</script>

<template>
  <div>
    <p v-if="loading">
      ..loading..
    </p>

    <p v-else-if="errorFetching" class="error">
      Failed to fetch data...
    </p>

    <table v-else>
      <thead>
      <tr>
        <th>Employee ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Salary</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="person in persons" :key="person.Id">
        <td>{{ person.Id }}</td>
        <td>{{ person.First_Name }}</td>
        <td>{{ person.Last_Name }}</td>
        <td>{{ person.Email }}</td>
        <td>{{ person.Salary }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
div {
  margin: 20px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

p {
  font-size: 16px;
  font-style: italic;
  color: gray;
}

button{
  margin-top: 10px;
}
</style>