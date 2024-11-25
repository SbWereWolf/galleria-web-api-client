<script setup>
import { reactive } from 'vue'

import Accounts from './end-point-client/accounts/ApiEndPoint.vue'

const data = reactive({
    location: 'http://localhost:8001',
    accounts: '/Accounts',
    sessionId: '',
})
</script>

<template>
    <div>
        <input v-model="data.location" />
        <input v-model="data.sessionId" />
    </div>
    <div>
        <h1>Картины на заказ API web client</h1>
        <h2>Home</h2>
        <h2>Accounts</h2>
        <details>
            <summary>Методы</summary>
            <Accounts
                v-model:api-location="data.location"
                v-model:end-point="data.accounts"
                v-model:session-id="data.sessionId"
            />
        </details>
        <h2>Visitors</h2>
        <h2>Artists</h2>
        <h2>Vouchers</h2>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h2 {
    font-size: 1.2rem;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h2 {
        text-align: left;
    }
}
</style>
