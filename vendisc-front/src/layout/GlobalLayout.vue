<template>
    <div id="app">
        <div class="container">
            <transition name="view" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>

    </div>
</template>

<script>
</script>

<style lang="stylus" scoped>

#app
    height 100vh
    background var(--vs-theme-bg2)

    .container 
        max-width 900px
        height 100vh
        margin 0 auto
        background var(--vs-theme-bg2)

        .view-enter-active
            transition all .5s ease
        
        .view-leave-active 
            display: none;

        .view-enter
            opacity 0
            transform translateY(-26px)
</style>