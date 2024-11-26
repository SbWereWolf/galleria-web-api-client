<script setup>
import FindForm from '@/api-clinet/end-point-client/visitors/FindForm.vue'
import UpdateForm from '@/api-clinet/end-point-client/visitors/UpdateForm.vue'
import ShowForm from '@/api-clinet/end-point-client/visitors/ShowForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <details>
        <summary>Список посетителей</summary>
        <ShowForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Профиль посетителя</summary>
        <FindForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Изменить адрес посетителя</summary>
        <UpdateForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="PUT" />
    </details>
</template>
