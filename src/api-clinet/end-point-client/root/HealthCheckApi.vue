<script setup>
import CheckForm from '@/api-clinet/end-point-client/root/CheckForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <CheckForm
        v-model:api-location="apiLocation"
        v-model:end-point="endPoint"
        actionName="Check"
        method="GET"
    />
</template>
