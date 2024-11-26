<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })
const actionName = defineModel('actionName', { default: 'Example for data' })

const data = reactive({
    code: '',
    content: '',
})

async function handleSubmit() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const response = await fetch(`${apiLocation.value}${endPoint.value}`, {
        method: method.value,
        headers: headers,
    })

    data.code = response.status.toLocaleString()
    data.content = response.statusText

    if (!response.ok) {
        console.error(response)
        throw new Error(`Response status: ${response.status}`)
    }
    if (response.ok) {
        response.json().then((json) => {
            data.content = JSON.stringify(json)
        })
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>{{ endPoint }}</h1>
            <div>
                <button type="submit">{{ actionName }}</button>
            </div>
        </form>
    </div>
    <div>
        <label for="code">Server Response Code: </label>
        <output id="code">{{ data.code }}</output>
    </div>
    <div>
        <label for="content">Server Response JSON Content</label>
    </div>
    <div>
        <textarea id="content" v-model="data.content" cols="40" maxlength="1024" readonly rows="10">
        </textarea>
    </div>
</template>
