<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })
const session = defineModel('session', { default: 'API working session ID' })

const logInEndPoint = `${endPoint.value}/login`

const data = reactive({
    input: '{\n' + '  "login": "login",\n' + '  "password": "password"\n' + '}',
    code: '',
    content: '',
})

async function logIn() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const response = await fetch(`${apiLocation.value}${logInEndPoint}`, {
        method: method.value,
        headers: headers,
        body: data.input,
    })

    data.code = response.status.toLocaleString()
    data.content = response.statusText
    let session_id = ''
    response.json().then((json) => {
        data.content = JSON.stringify(json)
        if (json?.session_id) {
            session_id = json.session_id
        }
    })

    if (response.ok && session_id) {
        localStorage.setItem('session_id', session_id)
        session.value = session_id
    }

    if (!response.ok) {
        console.error(response)
        throw new Error(`Response status: ${response.status}`)
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="logIn">
            <h1>{{ logInEndPoint }}</h1>
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
                <button type="submit">Log in</button>
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
