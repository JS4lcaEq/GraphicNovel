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
        <el-button @click="downloadJSON(JSON.stringify(store.data, null, 2), 'data.json')">
            {{ $t('message.files.buttons.load') }}
        </el-button>
        &nbsp; | &nbsp;
        {{ $t('message.files.buttons.upload') }}
        <input type="file" id="fileInput" @change="uploadJSONFile($event)" />
        <p>
            <el-upload ref="upload" class="upload-demo"
                :limit="1"
                :on-exceed="handleExceed" 
                :auto-upload="false"
                @onChange="uploadJSONFile">
                <template #trigger>
                    <el-button type="primary">select file</el-button>
                </template>
                <el-button class="ml-3" type="success" @click="uploadJSONFile">
                    upload to server
                </el-button>
                <template #tip>
                    <div class="el-upload__tip text-red">
                        limit 1 file, new file will cover the old file
                    </div>
                </template>
            </el-upload>
        </p>
        <p>=======================</p>
        <pre>{{ store.data }}</pre>



    </div>

</template>