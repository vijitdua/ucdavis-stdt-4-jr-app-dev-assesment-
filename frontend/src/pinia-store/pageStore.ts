import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Person} from "@/services/personsApiService";
import {getPersonsList} from "@/services/personsApiService";

export const usePageStore = defineStore('pageStore', () => {
  const currentPage = ref<number>(1);
  const personsPage = ref<Person[]>([]);
  const errorFetching = ref<boolean>(false);
  const loading = ref<boolean>(true);
  const numberOfPages = ref<number>(0);
  const singlePageLimit = 10;

  async function setPage(newPage: number) {
    loading.value = true;
    currentPage.value = newPage;
    try {
      let apiResponse = await getPersonsList(singlePageLimit, singlePageLimit * (currentPage.value - 1));
      personsPage.value = apiResponse.data;
      numberOfPages.value = Math.ceil(apiResponse.length / singlePageLimit);
      console.log(numberOfPages);
    } catch (error) {
      errorFetching.value = true;
    }
    loading.value = false;
  }

  return {currentPage, loading, errorFetching, setPage, personsPage, numberOfPages};
});
