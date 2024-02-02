<template>
    <!-- <vs-tooltip> -->
        <vs-button circle icon :color="color">
            <box-icon :type='type' :name='icon' color="white"></box-icon>
        </vs-button>

        <!-- <template #tooltip>
            {{tip}}
        </template>
    </vs-tooltip> -->
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            requried: true
        },

        tip: {
            type: String,
            required: true
        },

        type: {
            type: String,
            default: ''
        },
    }
}
</script>

<style lang="stylus" scoped>

</style>