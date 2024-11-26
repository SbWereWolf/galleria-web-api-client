<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })

const data = reactive({
    style: '',
    status: '',
    code: '',
    content: '',
})

async function FindVouchers() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const queryString = `${apiLocation.value}${endPoint.value}?session_id=${sessionId}`
    let statusFilter = data.style
        .split(',')
        .map((x) => x.trim())
        .reduce((whole, str) => {
            return `${whole}&status=${str}`
        })
    if (statusFilter) {
        statusFilter = `style=${statusFilter}`
    }

    let styleFilter = data.style
        .split(',')
        .map((x) => x.trim())
        .reduce((whole, str) => {
            return `${whole}&style=${str}`
        })
    if (styleFilter) {
        styleFilter = `style=${styleFilter}`
    }
    const response = await fetch(`${queryString}&${styleFilter}&${statusFilter}`, {
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
        <form @submit.prevent="FindVouchers">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="style">Style values that need to be considered for filter</label>
            </div>
            <div>
                <input id="style" v-model="data.style" maxlength="99" type="text" />
            </div>
            <div>
                <label for="status">Status values that need to be considered for filter</label>
            </div>
            <div>
                <input id="status" v-model="data.status" maxlength="99" type="text" />
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
