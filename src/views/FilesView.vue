<script setup>
import { ref } from 'vue'

import { useDataStore } from '@/stores/data'
const store = useDataStore()

import { useDownloadService } from '@/services/dowloadService'
const { downloadJSON } = useDownloadService()

const fileData = ref(null)

const fileList = ref([])

function onUpload() {
    if (fileList.value.length === 0) {
        alert('No file selected for upload.')
        return
    }
    const file = fileList.value[0]
    const reader = new FileReader()
    reader.onload = (e) => {
        try {
            const jsonData = e.target.result
            fileData.value = jsonData
            store.set(jsonData)
            store.save()
        } catch (error) {
            alert('Error parsing JSON file: ' + error.message)
        }
    }
    reader.readAsText(file.raw)
    // console.log('Uploading file to server:', file.raw)
}

const uploadJSONFile = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const jsonData = e.target.result
                fileData.value = jsonData
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


        <!--
        &nbsp; | &nbsp;
        {{ $t('message.files.buttons.upload') }}
        <input type="file" id="fileInput" @change="uploadJSONFile($event)" />
         -->
        <p><el-button @click="downloadJSON(JSON.stringify(store.data, null, 2), 'data.json')">
                {{ $t('message.files.buttons.load') }}
            </el-button></p>
        <div>
            
            <el-upload ref="upload" class="upload-demo" :limit="1" :on-exceed="handleExceed" :auto-upload="false"
                v-model:file-list="fileList">
                <template #trigger><el-button type="primary">{{ $t('message.files.buttons.select') }}</el-button></template>
                <el-button class="ml-3" type="success" @click="onUpload">{{ $t('message.files.buttons.upload') }}</el-button>
                <template #tip>
                    <div class="el-upload__tip text-red"></div>
                </template>
            </el-upload>

            <!-- <p>{{ fileList }}</p> -->

        </div>

        <pre>{{ store.data }}</pre>



    </div>

</template>

<style scoped>
.ml-3 {
    margin-left: 12px;
    margin-top: -3px;
}
</style>