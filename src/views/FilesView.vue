<script setup>
import { useDataStore } from '@/stores/data'
const store = useDataStore()

import { useDownloadService } from '@/services/dowloadService'
const { downloadJSON } = useDownloadService()

const uploadJSONFile = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const jsonData = e.target.result
                store.set(jsonData)
                store.save()    
                console.log('Uploaded JSON Data:', jsonData)
                alert('Файл загружен и сохранен в хранилище.')
            } catch (error) {
                alert('Error parsing JSON file: ' + error.message)
            }
        }
        reader.readAsText(file)
    }
}   

</script>

<template>

    <div class="file-view">
        <h2>file view</h2>
        <p>=======================</p>
        <p>{{ store.data }}</p>
        <p>=======================</p>
        <el-button @click="downloadJSON(JSON.stringify( store.data, null, 2 ), 'data.json')">Выгрузить JSON</el-button>
        <p>=======================</p>
        
        Загрузить JSON:
        <input type="file" id="fileInput" @change="uploadJSONFile($event)" />
    </div>

</template>