<script setup>
import FindForm from '@/api-clinet/end-point-client/artists/FindForm.vue'
import UpdateForm from '@/api-clinet/end-point-client/artists/UpdateForm.vue'
import ShowForm from '@/api-clinet/end-point-client/artists/ShowForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <details>
        <summary>Показать художника</summary>
        <ShowForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Изменить стиль</summary>
        <UpdateForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="PUT" />
    </details>
    <hr />
    <details>
        <summary>Подобрать художника по стилю</summary>
        <FindForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
</template>
