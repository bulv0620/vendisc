<template>
    <vs-dialog v-model="active" blur>
        <FileUploader ref="fileUploader"></FileUploader>
    </vs-dialog>
</template>

<script>
export default {
    props: ['show'],
    data: () => ({
        active: false,
    }),
    watch: {
        active(val) {
            this.$emit('update:show', val)
            if(!val) {
                this.$refs.fileUploader.abortAllTask()
            }
        },
        show(val) {
            this.active = val
        }
    },
    mounted() {
        this.active = this.show
    }
    
}
</script>

<style lang="stylus" scoped>

</style>