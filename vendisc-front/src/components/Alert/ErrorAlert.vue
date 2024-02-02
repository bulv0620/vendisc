<template>
    <vs-alert class="mb" danger v-model="show" :progress="progress">
        {{msg}}
    </vs-alert>
</template>

<script>
export default {
    props: ['display', 'msg'],

    data: () => ({
        show: false,
        time: 3000,
        progress: 0
    }),

    watch: {
        display(val) {
            if (val) {
                this.show = true

                let interval = setInterval(() => {
                    this.progress++
                }, this.time / 100)

                setTimeout(() => {
                    this.show = false
                    this.$emit('update:display', false)

                    clearInterval(interval)
                    this.progress = 0
                }, this.time);
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>