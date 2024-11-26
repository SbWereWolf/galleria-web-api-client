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

async function SwitchStyle() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const response = await fetch(
        `${apiLocation.value}${endPoint.value}/?session_id=${sessionId}&new_style=${data.input}`,
        {
            method: method.value,
            headers: headers,
        },
    )

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
        <form @submit.prevent="SwitchStyle">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="style">The first name to search for</label>
            </div>
            <div>
                <select v-model="data.input">
                    <option>realism</option>
                    <option>impressionism</option>
                    <option>fauvism</option>
                    <option>modern</option>
                    <option>expressionism</option>
                    <option>cubism</option>
                    <option>futurism</option>
                    <option>abstractionism</option>
                    <option>dadaism</option>
                    <option>pop-art</option>
                </select>
            </div>
            <div>
                <button type="submit">Switch</button>
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
