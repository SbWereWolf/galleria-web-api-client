<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })
const session = defineModel('session', { default: 'API working session ID' })

const logOutEndPoint = `${endPoint.value}/logout`

const data = reactive({
    input: '',
    code: '',
    content: '',
})

async function logOut() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const response = await fetch(`${apiLocation.value}${logOutEndPoint}/?session_id=${sessionId}`, {
        method: method.value,
        headers: myHeaders,
    })

    data.code = response.status.toLocaleString()
    data.content = response.statusText
    response.json().then((json) => {
        data.content = JSON.stringify(json)
    })

    if (response.ok) {
        localStorage.removeItem('session_id')
        session.value = localStorage.getItem('session_id') ?? ''
    }

    if (!response.ok) {
        console.error(response)
        throw new Error(`Response status: ${response.status}`)
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="logOut">
            <h1>{{ endPoint }}</h1>
            <div>
                <button type="submit">Log Out</button>
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
