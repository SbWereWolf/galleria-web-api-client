<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })

const data = reactive({
    firstName: '',
    lastName: '',
    code: '',
    content: '',
})

async function FindAccounts() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const response = await fetch(
        `${apiLocation.value}${endPoint.value}/?session_id=${sessionId}&first_name=${data.firstName}&last_name=${data.lastName}`,
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
        <form @submit.prevent="FindAccounts">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="firstName">The first name to search for</label>
            </div>
            <div>
                <input id="firstName" v-model="data.firstName" maxlength="99" type="text" />
            </div>
            <div>
                <label for="lastName">The last name to search for</label>
            </div>
            <div>
                <input id="lastName" v-model="data.lastName" maxlength="99" type="text" />
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
