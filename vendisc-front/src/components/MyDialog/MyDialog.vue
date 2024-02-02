<template>
    <vs-dialog width="300px" not-center v-model="active" :loading="loading">
        <template #header>
            <h4 class="not-margin">
                {{title}}
            </h4>
        </template>


        <div class="con-content">
            <slot></slot>
        </div>


        <template #footer>
            <div class="con-footer">
                <vs-button @click="$emit('handleOk')" transparent>
                    Ok
                </vs-button>
                <vs-button @click="active=false" dark transparent>
                    Cancel
                </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>

<script>
export default {
    props: {
        show: Boolean,
        title: String,
        loading: Boolean,
    },
    data: () => ({
        active: false,
    }),

    mounted() {
        this.active = this.show
    },

    watch: {
        active(val) {
            this.$emit('update:show', val)
        },
        show(val) {
            this.active = val
        }
    }
}
</script>

<style lang="stylus">
getColor(vsColor, alpha = 1)
    unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
    unquote("var(--vs-"+var+")")
.con-footer
  display flex
  align-items center
  justify-content flex-end
  .vs-button
    margin 0px
    .vs-button__content
      padding 10px 30px
    ~ .vs-button
      margin-left 10px
.not-margin
  margin 0px
  font-weight normal
  padding 10px
  padding-bottom 0px
.con-content
  width 100%
  p
    font-size .8rem
    padding 0px 10px
  .vs-checkbox-label
    font-size .8rem
  .vs-input-parent
    width 100%
  .vs-input-content
    margin 10px 0px
    width calc(100%)
    .vs-input
      width 100%
.footer-dialog
  display flex
  align-items center
  justify-content center
  flex-direction column
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>