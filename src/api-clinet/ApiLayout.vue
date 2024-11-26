<script setup>
import { reactive } from 'vue'

import AccountApi from './end-point-client/accounts/AccountApi.vue'
import HealthCheckApi from '@/api-clinet/end-point-client/root/HealthCheckApi.vue'
import ArtistApi from '@/api-clinet/end-point-client/artists/ArtistApi.vue'
import VisitorApi from '@/api-clinet/end-point-client/visitors/VisitorApi.vue'
import VouchersApi from '@/api-clinet/end-point-client/vouchers/VouchersApi.vue'

const data = reactive({
    session: '',
    location: 'http://localhost:8001',
    heathCheck: '/',
    accounts: '/Accounts',
    artists: '/Artists',
    visitors: '/Visitors',
    vouchers: '/Vouchers',
})
</script>

<template>
    <div>
        <input v-model="data.location" />
        <input v-model="data.session" />
    </div>
    <div>
        <h1>Картины на заказ API web client</h1>
        <h2>Health Check</h2>
        <details>
            <summary>Методы</summary>
            <HealthCheckApi
                v-model:api-location="data.location"
                v-model:end-point="data.heathCheck"
            />
        </details>
        <h2>Accounts</h2>
        <details>
            <summary>Методы</summary>
            <AccountApi
                v-model:api-location="data.location"
                v-model:end-point="data.accounts"
                v-model:session="data.session"
            />
        </details>
        <h2>Artists</h2>
        <details>
            <summary>Методы</summary>
            <ArtistApi v-model:api-location="data.location" v-model:end-point="data.artists" />
        </details>
        <h2>Visitors</h2>
        <details>
            <summary>Методы</summary>
            <VisitorApi v-model:api-location="data.location" v-model:end-point="data.visitors" />
        </details>
        <h2>Vouchers</h2>
        <details>
            <summary>Методы</summary>
            <VouchersApi v-model:api-location="data.location" v-model:end-point="data.vouchers" />
        </details>
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
