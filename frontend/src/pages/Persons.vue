<script setup lang="ts">
import router from "../router.ts";
import {usePageStore} from "../pinia-store/pageStore.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const pageStore = usePageStore();
const {personsPage, loading, errorFetching, currentPage, numberOfPages} = storeToRefs(pageStore);

onMounted(() => {
  pageStore.setPage(currentPage.value);
});

const headers = [
  {title: "Employee ID", key: "Id"},
  {title: "First Name", key: "First_Name"},
  {title: "Last Name", key: "Last_Name"},
  {title: "Email", key: "Email"},
  {title: "Salary", key: "Salary"},
];

// Redirects you to the individual person page
function goToPerson(personId: string) {
  router.push(`/person/${personId}`);
}

</script>

<template>
  <v-container>


    <v-alert v-if="errorFetching" type="error" class="center" text="Failed to load data" icon="$error">
    </v-alert>

    <v-data-table
        v-else
        :headers="headers"
        :items="personsPage"
        item-value="Id"
        :loading="loading"
        :hide-default-footer="true"
    >
      <template v-slot:item="{ item }">
        <tr class="pointer-style">
          <td @click="goToPerson(item.Id)">{{ item.Id }}</td>
          <td @click="goToPerson(item.Id)">{{ item.First_Name }}</td>
          <td @click="goToPerson(item.Id)">{{ item.Last_Name }}</td>
          <td @click="goToPerson(item.Id)">{{ item.Email }}</td>
          <td @click="goToPerson(item.Id)">{{ item.Salary }}</td>
          <td>
            <v-btn size="small" variant="tonal" @click="()=>router.push(`/edit/${item.Id}`)">✏️ Edit</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-container class="center">
      <v-btn color="primary" class="mb-4" @click="router.push('/add')">➕ Add New Person</v-btn>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination v-model="currentPage" :length="numberOfPages" class="my-4" @update:model-value="(page) => pageStore.setPage(page)"/>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<style scoped>
div {
  margin: 20px auto;
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

.pagination-control {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.center {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
