<script setup>
import LoginForm from './LoginForm.vue'
import LogoutForm from './LogoutForm.vue'
import RequestWithBodyForm from '../../ui/RequestWithBodyForm.vue'
import RequestWithQueryStringForm from '../../ui/RequestWithQueryStringForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <details>
        <summary>Зарегистрировать учётную запись</summary>
        <RequestWithBodyForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="POST"
            example='{
  "login": "10",
  "password": "theAccounts",
  "surName": "Green",
  "firstName": "John",
  "patronymic": "James",
  "email": "john@email.com",
  "type_role": "artist",
  "phone": "12345",
  "sex": "m",
  "date_of_birth": "2000-01-01"
}'
        />
    </details>
    <details>
        <summary>Начать сессию работы с API</summary>
        <LoginForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="POST" />
    </details>
    <details>
        <summary>Получить данные учётной записи</summary>
        <RequestWithQueryStringForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="GET"
        />
    </details>
    <details>
        <summary>Изменить данные учётной записи</summary>
        <RequestWithBodyForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="PUT"
        />
    </details>
    <details>
        <summary>Удалить учётную запись</summary>
        <RequestWithBodyForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="DELETE"
        />
    </details>
    <details>
        <summary>Завершить сессию работы с API</summary>
        <LogoutForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
</template>
