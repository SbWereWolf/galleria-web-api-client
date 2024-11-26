<script setup>
import CreateForm from '@/api-clinet/end-point-client/vouchers/CreateForm.vue'
import FindForm from '@/api-clinet/end-point-client/vouchers/FindForm.vue'
import UpdateForm from '@/api-clinet/end-point-client/vouchers/UpdateForm.vue'
import ShowForm from '@/api-clinet/end-point-client/vouchers/ShowForm.vue'
import DeleteForm from '@/api-clinet/end-point-client/vouchers/DeleteForm.vue'

const apiLocation = defineModel('apiLocation', { default: 'API server host name with protocol' })
const endPoint = defineModel('endPoint', { default: 'API call end point' })
</script>

<template>
    <details>
        <summary>Добавить ваучер</summary>
        <CreateForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            example='{
  "id": 10,
  "customer": "198login",
  "executor": "198login",
  "amount_pictures": 3,
  "price": 100,
  "description": "3 pictures for 100$",
  "status": "placed",
  "style": "realism"
}'
            method="POST"
        />
    </details>
    <hr />
    <details>
        <summary>Подобрать ваучеры по стилю и статусу</summary>
        <FindForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Обновить статус ваучера</summary>
        <UpdateForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="PUT" />
    </details>
    <hr />
    <details>
        <summary>Показать ваучер</summary>
        <ShowForm v-model:api-location="apiLocation" v-model:end-point="endPoint" method="GET" />
    </details>
    <hr />
    <details>
        <summary>Удалить ваучер</summary>
        <DeleteForm
            v-model:api-location="apiLocation"
            v-model:end-point="endPoint"
            method="DELETE"
        />
    </details>
</template>
