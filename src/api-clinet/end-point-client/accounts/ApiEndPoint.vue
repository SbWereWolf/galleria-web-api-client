<script setup>
import LoginForm from './LoginForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
</template>
