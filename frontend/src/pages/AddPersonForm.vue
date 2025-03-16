<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createPerson, getPersonById, updatePersonById, type Person } from '../services/personsApiService';

const route = useRoute();
const router = useRouter();
const isEditMode = ref<boolean>(false);
const loading = ref<boolean>(false);
const errorMessage = ref<string>('');
const valid = ref<boolean>(false);
const formRef = ref(); // Reference to the form

const form = ref<Person>({
  Id: '',
  First_Name: '',
  Last_Name: '',
  Email: '',
  Salary: ''
});

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    loading.value = true;
    try {
      const data = await getPersonById(route.params.id as string);
      form.value = data;
    } catch (e) {
      errorMessage.value = 'Failed to load person data.';
    }
    loading.value = false;
  }
});

async function handleSubmit() {
  const isValid = await formRef.value.validate();
  if (!isValid.valid) return;

  loading.value = true;
  try {
    if (isEditMode.value) {
      await updatePersonById(form.value.Id, form.value);
    } else {
      await createPerson({
        First_Name: form.value.First_Name,
        Last_Name: form.value.Last_Name,
        Email: form.value.Email,
        Salary: form.value.Salary,
        Id: ''
      });
    }
    router.push('/');
  } catch (e) {
    errorMessage.value = 'Submission failed.';
  }
  loading.value = false;
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-4" max-width="600">
      <v-card-title>{{ isEditMode ? 'Edit Person' : 'Add New Person' }}</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>

        <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-if="isEditMode"
            v-model="form.Id"
            label="Employee ID"
            disabled
          />
          <v-text-field
            v-model="form.First_Name"
            label="First Name"
            :rules="[v => !!v || 'First name is required']"
            required
          />
          <v-text-field
            v-model="form.Last_Name"
            label="Last Name"
            :rules="[v => !!v || 'Last name is required']"
            required
          />
          <v-text-field
            v-model="form.Email"
            label="Email"
            :rules="[v => !!v || 'Email is required']"
            required
          />
          <v-text-field
            v-model="form.Salary"
            label="Salary"
            :rules="[v => !!v || 'Salary is required']"
            required
          />

          <v-btn type="submit" :disabled="!valid" color="primary" class="mt-4">
            {{ isEditMode ? 'Update' : 'Create' }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  width: 100%;
}
</style>
