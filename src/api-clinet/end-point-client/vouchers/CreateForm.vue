<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })

const data = reactive({
    input:
        '{\n' +
        '  "id": 10,\n' +
        '  "customer": "198login",\n' +
        '  "executor": "198login",\n' +
        '  "amount_pictures": 3,\n' +
        '  "price": 100,\n' +
        '  "description": "3 pictures for 100$",\n' +
        '  "status": "placed",\n' +
        '  "style": "realism"\n' +
        '}',
    code: '',
    content: '',
})

async function handleSubmit() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const response = await fetch(`${apiLocation.value}${endPoint.value}?session_id=${sessionId}`, {
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
                <button type="submit">Create</button>
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
