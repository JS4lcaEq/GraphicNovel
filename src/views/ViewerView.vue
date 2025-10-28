<script setup>
import { ref, computed, onMounted} from 'vue'

import { useDataStore } from '@/stores/data'
const data = useDataStore()

import { useHistoryStore } from '@/stores/history'
const history = useHistoryStore()



const setBg = (imageUrl) => { elementContent.style.backgroundImage = `url('${imageUrl}')` }

onMounted(() => {
    data.load()
    // history.step(1)
})

const current = computed(() => { return data.get(history.current) })

</script>

<template>

    <div class="viewer-view">
        <div class="viewer-content"
            :style="{ backgroundImage: 'url(./img/' + data.get(history.getCurrent()).bg + ')' }">
            
            <!-- <p>{{ data.get(history.getCurrent()) }}</p> -->
            <!-- <p>{{ history.getCurrent() }}</p>  -->
            <!-- <p>{{ history.getHistory() }}</p> -->
             
            <p>{{ history.getHistoryText }}</p>
            <div class="text">{{ current.text }}</div>
            <div class="buttons">
                <button v-for="(btn, index) in data.get(history.getCurrent()).buttons" :key="index"
                    @click="history.step(btn.go - 0, btn.id - 0)">
                    {{ btn.text }}
                </button>
            </div>
           
        </div>
    </div>
</template>

<style>
.viewer-view {
    position: absolute;
    height: 100vmin;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.viewer-content {
    background-color: rgba(187, 160, 160, 0.767);
    height: 100vmin;
    width: 100vmin;
    z-index: 11;
}

.viewer-content .text {
    margin-top: 100px;
    font-size: 44px;
    text-align: center;
}

.viewer-content button {
    margin: 20px;
    padding: 10px 20px;
    font-size: 34px;
    background-color: transparent;
    border: 1px solid #000;
    color: #000;
    cursor: pointer;
}

.buttons {
    display: flex;
    justify-content:space-between;    
}

</style>