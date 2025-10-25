import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", () => {
    const current = ref(1)
    const step = (id) => {
        current.value = id
    }
    return {current, step}
});