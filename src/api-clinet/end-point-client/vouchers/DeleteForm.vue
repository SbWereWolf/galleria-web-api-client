<script setup>
import { reactive } from 'vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const method = defineModel('method', { default: 'HTTP request method' })

const data = reactive({
    voucherId: 0,
    code: '',
    content: '',
})

async function DeleteAccount() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const sessionId = localStorage.getItem('session_id')
    const response = await fetch(
        `${apiLocation.value}${endPoint.value}/${data.voucherId}?session_id=${sessionId}`,
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
        <form @submit.prevent="DeleteAccount">
            <h1>{{ endPoint }}</h1>
            <div>
                <label for="voucher_id">ID of Vouchers to return</label>
            </div>
            <div>
                <input id="voucher_id" v-model="data.voucherId" maxlength="38" type="number" />
            </div>
            <div>
                <button type="submit">Delete voucher</button>
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
