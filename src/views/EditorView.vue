<script setup>
import { useDataStore } from '@/stores/data'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import mermaid from 'mermaid'
import { ElMessage } from 'element-plus'

const store = useDataStore()

import { useHistoryStore } from '@/stores/history'
const history = useHistoryStore()

const selectedNode = ref(null)
const selectedPage = ref(null)
const form = ref({
    id: null,
    text: '',
    buttons: []
})

const formRules = {
    text: [
        { required: true, message: 'Please input scene text', trigger: 'blur' },
        { min: 3, message: 'Length should be at least 3 characters', trigger: 'blur' }
    ]
}

const getNodeId = (nodeId) => {
    const match = nodeId.match(/p(\d+)/)
    return match ? parseInt(match[1]) : null
}

const handleNodeClick = (node) => {
    const nodeId = getNodeId(node.id)
    history.step(nodeId - 0)
    store.selectedNodeId = nodeId
    selectedPage.value = store.get(nodeId) // Update selectedPage based on nodeId
    renderDiagram()
    console.log('Clicked node:', selectedPage.value)
}

const renderDiagram = async () => {
    const { svg } = await mermaid.render('mermaid-diagram', store.mermaid)
    const container = document.getElementById('mermaid-container')
    container.innerHTML = svg

    // Add click listeners and restore highlighting
    container.querySelectorAll('.node').forEach(node => {
        node.style.cursor = 'pointer'
        node.addEventListener('click', () => handleNodeClick(node))

        // Restore highlighting if this is the selected node
        const nodeId = getNodeId(node.id)
        if (nodeId == store.selectedNodeId) {
            node.classList.add('node-selected')
            selectedNode.value = node
        }
    })
}

onMounted(() => {
    store.load()
    mermaid.initialize({
        startOnLoad: true,
        securityLevel: 'loose',
        flowchart: {
            htmlLabels: true
        }
    })
    renderDiagram()
})

watch(() => store.selectedNode, (newNode) => {
    if (newNode) {
        form.value = {
            id: newNode.id,
            text: newNode.text,
            bg: newNode.bg,
            className: newNode.className,
            buttons: [...newNode.buttons]
        }
    } else {
        form.value = { id: null, text: '', bg: null, buttons: [] }
    }
}, { immediate: true })

const onAddButton = () => {
    //form.value.buttons.push({ text: 'New Button', go: null });
    console.log("onAddButton", store.selectedNodeId)
    store.addButton(store.selectedNodeId)
}

const removeButton = (index) => {
    form.value.buttons.splice(index, 1)
}

const saveChanges = () => {
    if (form.value) {
        const updatedNode = {
            ...form.value
        }
        console.log('Saving changes to node:', updatedNode)
        store.updateSingleElement(updatedNode)
        store.save()
        renderDiagram()
        ElMessage({
            message: 'Scene updated successfully' + updatedNode.text,
            type: 'success',
        })
    }
}

const onAdd = () => {
    const newElement = store.add()
    store.save()
    setTimeout(() => {
        store.selectedNodeId = newElement.id
        store.load()
        renderDiagram()
    }, 300)


    ElMessage({
        message: 'New scene added with id ' + newElement.id,
        type: 'success',
    })
}

const onDel = () => {
    if (store.selectedNodeId !== null) {
        const success = store.del(store.selectedNodeId)
        if (success) {
            store.save()
            store.selectedNodeId = null
            store.load()
            renderDiagram()
            ElMessage({
                message: 'Scene deleted successfully',
                type: 'success',
            })
        } else {
            ElMessage({
                message: 'Failed to delete scene',
                type: 'error',
            })
        }
    }
}



onUnmounted(() => {
    if (selectedNode.value) {
        selectedNode.value.classList.remove('node-selected')
    }
})
</script>

<template>

    <div class="editor-view">


        <el-row>
            <el-col :span="10">
                <div>
                    <!-- <p>{{ store.data }}</p>
                    <p>{{ store.pages }}</p>
                    <p>{{ store.buttons }}</p>
                    <p>store.selectedNodeId = {{ store.selectedNodeId }}</p>
                    <p>store.selectedNode = {{ store.selectedNode }}</p>
                    <p>
                        <pre>{{ store.mermaid }}</pre>
                    </p> -->
                    <p>
                        <el-button type="success" @click="onAdd">Новая сцена</el-button>
                    </p>
                    <el-card v-if="store.selectedNode" class="edit-form">
                        <template #header>
                            <div class="card-header">
                                <span>Редактирование сцены</span>
                                <span>Id:{{ form.id }}</span>
                            </div>
                        </template>

                        <el-form :model="form" :rules="formRules" label-width="auto" class="scene-form">

                            <el-form-item label="Id" prop="id">
                                <strong>{{ form.id }}</strong>
                            </el-form-item>

                            <el-form-item label="Текст сцены" prop="text">
                                <el-input v-model="form.text" type="textarea" :rows="4" />
                            </el-form-item>

                            <el-form-item label="Фон сцены" prop="bg">
                                <el-col :span="11">
                                    <el-input v-model="form.bg" type="text" />
                                </el-col>
                                <el-col :span="11">
                                    <img v-if="form.bg" :src="'./img/' + form.bg" id="img-preview" />
                                </el-col>
                            </el-form-item>

                            <el-form-item label="Стиль" prop="className">
                                <el-col :span="11">
                                    <el-input v-model="form.className" type="text" />
                                </el-col>

                            </el-form-item>

                            <el-form-item label="." prop="buttons">
                                <el-button type="primary" @click="saveChanges">Запомнить</el-button>
                                <span v-if="!store.isExistsInputButtonGo(form.id)">
                                    &nbsp; <el-button type="danger" @click="onDel">Удалить</el-button>
                                </span>

                            </el-form-item>

                            <el-form-item label="Кнопки сцены">
                                <div>текст / переход к сцене / условие демонстрации</div>
                                <el-space direction="vertical" style="width: 100%">
                                    <div v-for="(button, index) in form.buttons" :key="index" class="button-item">
                                        <span>{{ button.id }}</span>
                                        <el-input v-model="button.text" placeholder="Button text" />/
                                        <el-input v-model="button.go" placeholder="Go to page" />/
                                        <el-input v-model="button.ifRegExp" placeholder="if RegExp" />
                                        <el-popconfirm title="Are you sure to delete this button?"
                                            @confirm="removeButton(index)">
                                            <template #reference>
                                                <el-button type="danger">
                                                    Удалить
                                                </el-button>
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <el-button type="primary" @click="onAddButton">
                                        Новая кнопка
                                    </el-button>
                                </el-space>
                            </el-form-item>

                        </el-form>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="14">
                <div>
                    <div id="mermaid-container"></div>
                    <div id="mermaid-diagram" style="display: none;"></div>
                </div>
            </el-col>
        </el-row>
    </div>


</template>

<style scoped>
#mermaid-container {
    width: 100%;
    margin: 20px 0;
}

#img-preview {
    margin-left: 10px;
    margin-top: -16px;
    display: block;
    position: absolute;
    width: 90px;
    height: 90px;
}

:deep(.node-selected) {
    filter: drop-shadow(0 0 8px #409EFF);
}

:deep(.node:hover) {
    filter: brightness(0.9);
}

.edit-form {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}

.scene-form {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-item {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
}
</style>