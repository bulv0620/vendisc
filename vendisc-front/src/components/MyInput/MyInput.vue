<template>
    <vs-input v-model="modelValue" block :state="state" @input="clearState" v-bind="$attrs">
        <template #icon>
            <box-icon :name='icon' type='solid' color="#999"></box-icon>
        </template>
        <template #message-danger v-if="error && msg !== ''">
            <p>{{msg}}</p>
        </template>
    </vs-input>
</template>

<script>
export default {
    props: ['value', 'icon', 'error', 'msg'],
    data: () => ({
        modelValue: '',
    }),
    computed: {
        state() {
            return this.error ? 'danger' : ''
        }
    },
    watch: {
        value(val) {
            this.modelValue = val;
        },

        modelValue(val) {
            this.$emit('update:value', val);
        }
    },
    methods: {
        clearState() {
            this.$emit('update:error', false);
        }
    },
    mounted() {
        this.modelValue = this.value
    }
}
</script>

<style lang="stylus" scoped>

</style>