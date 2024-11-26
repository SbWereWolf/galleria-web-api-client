<script setup>
import FindForm from '@/api-clinet/end-point-client/artists/FindForm.vue'
import UpdateForm from '@/api-clinet/end-point-client/artists/UpdateForm.vue'
import ShowForm from '@/api-clinet/end-point-client/artists/ShowForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <details>
        <summary>Показать профиль</summary>
        <ShowForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <details>
        <summary>Изменить стиль</summary>
        <UpdateForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="PUT" />
    </details>
    <details>
        <summary>Найти художника</summary>
        <FindForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
</template>
