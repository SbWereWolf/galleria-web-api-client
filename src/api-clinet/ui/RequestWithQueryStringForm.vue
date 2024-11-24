<script setup>
const ApiLocation = defineModel('ApiLocation', { default: 'API server host name with protocol' })
const EndPoint = defineModel('EndPoint', { default: 'API call end point' })
const Method = defineModel('Method', { default: 'HTTP request method' })
</script>

<script>
import { reactive } from 'vue'

export default {
    name: 'LoginEndPoint',
    setup() {
        const data = reactive({
            input: '',
            code: '',
            content: '',
        })

        return {
            data,
        }
    },
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>{{ EndPoint }}</h1>
            <div>
                <label for="body">JSON request body</label>
            </div>
            <div>
                <textarea
                    id="body"
                    v-model="data.input"
                    cols="40"
                    maxlength="1024"
                    required
                    rows="10"
                    type="text"
                >
                </textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    <div>
        <label for="code">Server Response Code: </label>
        <span id="code">{{ data.code }}</span>
    </div>
    <div>
        <label for="content">Server Response JSON Content</label>
    </div>
    <div>
        <textarea id="content" v-model="data.content" cols="40" maxlength="1024" readonly rows="10">
        </textarea>
    </div>
</template>
