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

async function FindAccounts() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const queryString = `${apiLocation.value}${endPoint.value}/${sessionId}/?`
    let filter = data.input
        .split(',')
        .map((x) => x.trim())
        .reduce((whole, str) => {
            return `${whole}&style_list=${str}`
        })
    if (filter) {
        filter = `style_list=${filter}`
    }
    const response = await fetch(`${queryString}${filter}`, {
        method: method.value,
        headers: headers,
    })

    data.code = response.status.toLocaleString()
    data.content = response.statusText
    response.json().then((json) => {
        data.content = JSON.stringify(json)
    })

    if (!response.ok) {
        console.error(response)
        throw new Error(`Response status: ${response.status}`)
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="FindAccounts">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="styles">Style values that need to be considered for filter</label>
            </div>
            <div>
                <input id="styles" v-model="data.input" maxlength="99" type="text" />
            </div>
            <div>
                <button type="submit">Find</button>
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
