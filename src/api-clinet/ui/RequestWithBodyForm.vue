<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })
const actionName = defineModel('actionName', { default: 'Example for data' })
const example = defineModel('example', { default: 'Example for data' })

const data = reactive({
    input: example,
    code: '',
    content: '',
})

async function handleSubmit() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const response = await fetch(`${apiLocation.value}${endPoint.value}`, {
        method: method.value,
        headers: myHeaders,
        body: data.input,
    })

    data.code = response.status.toLocaleString()
    data.content = response.statusText
    let result = ''
    response.json().then((json) => {
        result = JSON.stringify(json)
        console.log(result)
        if (result) {
            data.content = result
        }
    })

    if (!response.ok) {
        console.error(response)
        throw new Error(`Response status: ${response.status}`)
    }
}
</script>

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
                    rows="10"
                    type="text"
                >
                </textarea>
            </div>
            <div>
                <button type="submit">{{ actionName }}</button>
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
