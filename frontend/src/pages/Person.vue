<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getPersonById, type Person} from "../services/personsApiService.ts";
import router from "../router.ts";

const route = useRoute();
const personId = ref(route.params.id);
const personData = ref<Person | null>(null);
const errorFetching = ref(false)
const loading = ref(true)

// Change value of person when route changes
onMounted(async () => {
  personId.value = route.params.id;
  errorFetching.value = false;
  loading.value = true;

  try {
    personData.value = await getPersonById(String(personId.value));
  } catch (error) {
    errorFetching.value = true;
    console.log(`Error (watchEffect in Person.vue) fetching person with id: ${personId.value}, error: ${error}`);
  }

  loading.value = false;
});

function goBack(){
  router.push("/persons");
}
</script>

<template>
  <div>

    <p v-if="loading">
      ..loading..
    </p>

    <p v-else-if="errorFetching" class="error">
      Failed to fetch data for employee ID {{ personId }}.
    </p>

    <table v-else>
      <tbody>
      <tr>
        <th>Employee ID</th>
        <td>{{ personData?.Id }}</td>
      </tr>
      <tr>
        <th>First Name</th>
        <td>{{ personData?.First_Name }}</td>
      </tr>
      <tr>
        <th>Last Name</th>
        <td>{{ personData?.Last_Name }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{ personData?.Email }}</td>
      </tr>
      <tr>
        <th>Salary</th>
        <td>{{ personData?.Salary }}</td>
      </tr>
      </tbody>
    </table>
    <button class="back-button" @click="goBack">⬅️Go Back</button>
  </div>
</template>

<style scoped>
div {
  max-width: 600px;
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