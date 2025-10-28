import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", () => {
    const current = ref(1)
    const history = ref(['s1'])
    const step = (id, buttonId) => {
        current.value = id
        
        if (buttonId) {
            history.value.push('b' + buttonId)
        }
        
        history.value.push('s' + id)

    }
    const getHistory = () => {
        return history.value
    }

    const getHistoryText = computed(() => {
        return history.value.join('')
    })

    const getCurrent = () => {
        return current.value
    }
    return {current, step, getHistory, getCurrent, getHistoryText};
});