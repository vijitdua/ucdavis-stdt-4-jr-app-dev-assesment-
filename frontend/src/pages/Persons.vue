<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getPersonsList, type Person} from "../services/personsApiService.ts";
import router from "../router.ts";
import {usePageStore} from "../pinia-store/pageStore.ts";

const persons = ref<Person[]>([]); // Store fetched persons
const errorFetching = ref(false);
const loading = ref(true);
const pageStore = usePageStore();

// Load employee records
watchEffect(async () => {
      loading.value = true;
      try {
        persons.value = await getPersonsList(10, pageStore.currentPage - 1);
      } catch (error) {
        errorFetching.value = true;
      }
      loading.value = false;
    }
);

function goToNextPage() {
  pageStore.setPage(pageStore.currentPage + 1);
}

function goToPreviousPage() {
  pageStore.setPage(pageStore.currentPage - 1);
}

// Redirects you to the individual person page
function goToPerson(personId: string) {
  router.push(`/person/${personId}`);
}

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
      <tr v-for="person in persons" :key="person.Id" @click="goToPerson(person.Id)" class="pointer-style">
        <td>{{ person.Id }}</td>
        <td>{{ person.First_Name }}</td>
        <td>{{ person.Last_Name }}</td>
        <td>{{ person.Email }}</td>
        <td>{{ person.Salary }}</td>
      </tr>
      </tbody>
    </table>

    <button @click="goToPreviousPage" :disabled="pageStore.currentPage === 1">Previous</button>
    <span>Page {{ pageStore.currentPage }} of 10</span>
    <button @click="goToNextPage" :disabled="pageStore.currentPage === 10">Next</button>
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

button {
  margin-top: 10px;
}

.pointer-style {
  cursor: pointer;
}
</style>