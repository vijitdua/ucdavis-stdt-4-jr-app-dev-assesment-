import {defineStore} from 'pinia';
import {ref} from 'vue';

export const usePageStore = defineStore('pageStore', () => {
    const currentPage = ref(1);

    function setPage(newPage: number) {
        currentPage.value = newPage;
    }

    return {currentPage, setPage};
});
