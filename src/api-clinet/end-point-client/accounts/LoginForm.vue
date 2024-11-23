<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })

const data = reactive({
    input: '',
    code: '',
    content: '',
})

function handleSubmit() {
    alert(apiLocation.value + ' ' + endPoint.value + '/login ' + ' ' + method.value)
}
</script>

<script></script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="body">JSON request body</label>
            </div>
            <div>
                <textarea
                    id="body"
                    v-model="data.input"
                    cols="40"
                    maxlength="1024"
                    required
                    rows="10"
                    type="text"
                >
                </textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    <div>
        <label for="code">Server Response Code: </label>
        <span id="code">{{ data.code }}</span>
    </div>
    <div>
        <label for="content">Server Response JSON Content</label>
    </div>
    <div>
        <textarea id="content" v-model="data.content" cols="40" maxlength="1024" readonly rows="10">
        </textarea>
    </div>
</template>
