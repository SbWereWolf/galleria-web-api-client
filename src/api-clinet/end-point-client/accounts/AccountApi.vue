<script setup>
import LogInForm from './LogInForm.vue'
import LogOutForm from './LogOutForm.vue'
import RequestWithBodyForm from '../../ui/RequestWithBodyForm.vue'
import FindForm from '@/api-clinet/end-point-client/accounts/FindForm.vue'
import UpdateForm from '@/api-clinet/end-point-client/accounts/UpdateForm.vue'
import DeleteForm from '@/api-clinet/end-point-client/accounts/DeleteForm.vue'

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
    <hr />
    <details>
        <summary>Начать сессию работы с API</summary>
        <LogInForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="POST"
            v-model:session="session"
        />
    </details>
    <hr />
    <details>
        <summary>Получить данные учётных записей</summary>
        <FindForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Изменить данные учётной записи</summary>
        <UpdateForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="PUT" />
    </details>
    <hr />
    <details>
        <summary>Удалить учётную запись</summary>
        <DeleteForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="DELETE"
            v-model:session="session"
        />
    </details>
    <hr />
    <details>
        <summary>Завершить сессию работы с API</summary>
        <LogOutForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="GET"
            v-model:session="session"
        />
    </details>
</template>
