<script setup>
import LogInForm from './LogInForm.vue'
import LogOutForm from './LogOutForm.vue'
import RequestWithBodyForm from '../../ui/RequestWithBodyForm.vue'
import RequestWithQueryStringForm from '../../ui/RequestWithQueryStringForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
const session = defineModel('session', { default: 'API working session ID' })
</script>

<template>
    <details>
        <summary>Зарегистрировать учётную запись</summary>
        <RequestWithBodyForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="POST"
            action-name="Create account"
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
        <LogInForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="POST"
            v-model:session="session"
        />
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
        <LogOutForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            v-model:session="session"
            method="GET"
        />
    </details>
</template>
