<template>
    <div class="progress-box" :style="{height}">
        <div class="progress" :style="{background: color, width: ratio + '%'}"></div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            required: false,
            default: '8px'
        },
        color: {
            type: String,
            required: false,
            default: '#6990F2'
        },
        ratio: {
            type: Number,
            required: false,
            default: 0
        }
    }
}
</script>

<style lang="stylus" scoped>
.progress-box
    width 100%
    background #e3e3e3
    width 100%
    border-radius 6px
    overflow hidden

    .progress {
        height 100%
    }
</style>