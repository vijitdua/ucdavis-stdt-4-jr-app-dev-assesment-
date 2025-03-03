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
  <v-container>
    <v-alert v-if="loading" type="info">
      ..loading..
    </v-alert>

    <v-alert v-else-if="errorFetching" type="error">
      Failed to fetch data...
    </v-alert>

    <v-table v-else>
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
    </v-table>

    <v-container class="pagination-control">
      <v-btn color="primary" @click="goToPreviousPage" :disabled="pageStore.currentPage === 1">Previous</v-btn>
      <v-chip color="primary">
        {{ pageStore.currentPage }} / 10
      </v-chip>
      <v-btn color="primary" @click="goToNextPage" :disabled="pageStore.currentPage === 10">Next</v-btn>
    </v-container>

  </v-container>
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

.pagination-control{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
</style>