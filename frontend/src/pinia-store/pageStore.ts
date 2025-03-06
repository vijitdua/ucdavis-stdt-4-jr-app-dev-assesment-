import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Person} from "../services/personsApiService.ts";
import {getPersonsList} from "../services/personsApiService.ts";

export const usePageStore = defineStore('pageStore', () => {
    const currentPage = ref<number>(1);
    const personsPage = ref<Person[]>([]);
    const errorFetching = ref<boolean>(false);
    const loading = ref<boolean>(true);

    async function setPage(newPage: number) {
        loading.value = true;
        currentPage.value = newPage;
        try {
            personsPage.value = await getPersonsList(10, currentPage.value - 1);
        } catch (error) {
            errorFetching.value = true;
        }
        loading.value = false;
    }

    return {currentPage, loading, errorFetching, setPage, personsPage};
});
