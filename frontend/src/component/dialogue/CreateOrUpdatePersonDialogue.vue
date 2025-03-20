<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import type { Person } from "@/services/personsApiService";

const props = defineProps<{
  open: boolean;
  isEditMode?: boolean;
  personId?: string;
  personData?: Person;
  close: () => void;
}>();

const dialogVisible = ref(false);

watchEffect(() => {
  dialogVisible.value = props.open;
});

// call parent close function
function handleClose() {
  props.close();
}
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <v-card>
      <v-card-title>
      </v-card-title>
      // content
      <v-card-actions>
        <v-btn @click="handleClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
