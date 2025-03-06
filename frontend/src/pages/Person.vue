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
  <v-container class="d-flex justify-center">

    <v-card v-if="!loading && !errorFetching">
      <v-card-title class="text-h5">{{ personData?.First_Name }} {{ personData?.Last_Name }}</v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title><strong>Employee ID:</strong> {{ personData?.Id }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><strong>Email:</strong> ${{ personData?.Email }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><strong>Salary:</strong> ${{ personData?.Salary }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="goBack">⬅️ Go Back</v-btn>
      </v-card-actions>
    </v-card>

    <v-progress-circular v-else-if="loading" indeterminate color="primary" class="my-4" />

    <v-alert v-else-if="errorFetching" type="error" class="my-4">
      Failed to fetch data for employee ID {{ personId }}.
    </v-alert>

  </v-container>
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