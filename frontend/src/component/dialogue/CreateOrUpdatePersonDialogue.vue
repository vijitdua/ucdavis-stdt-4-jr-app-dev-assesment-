<script setup lang="ts">
import {onMounted, ref, watch, watchEffect} from 'vue';
import {createPerson, deletePerson, getPersonById, type Person, updatePersonById} from "@/services/personsApiService";

const props = defineProps<{
  open: boolean;
  personId?: string;
  personData?: Person;
  close: () => void;
}>();

const dialogVisible = ref(false);

watch(() => props.open, (newVal) => {
  dialogVisible.value = newVal;
});

// call parent close function
function handleClose() {
  dialogVisible.value = false;
  props.close();
  form.value = {
    Id: '',
    First_Name: '',
    Last_Name: '',
    Email: '',
    Salary: ''
  };
  isEditMode.value = false;
  errorMessage.value = '';
}

async function handleDelete() {
  if (!form.value.Id) return;
  loading.value = true;
  try {
    await deletePerson(form.value.Id);
    handleClose();
  } catch (e) {
    errorMessage.value = 'Failed to delete person.';
  }
  loading.value = false;
}

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

watchEffect(async () => {
  if (props.personId) {
    isEditMode.value = true;
    loading.value = true;
    try {
      form.value = await getPersonById(props.personId as string);
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
    handleClose();
  } catch (e) {
    errorMessage.value = 'Submission failed.';
  }
  loading.value = false;
}
</script>

<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="600px"
    @click:outside="handleClose"
    @keydown.esc="handleClose"
  >
    <v-card>
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
          <v-card-actions>
            <v-btn
              v-if="isEditMode"
              color="error"
              class="mt-4 ml-2"
              @click="handleDelete"
            >
              Delete Record
            </v-btn>
            <v-btn type="submit" :disabled="!valid" color="primary" class="mt-4">
              {{ isEditMode ? 'Update' : 'Create' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
