<template>
    <div class="table">
        <vs-table v-model="selected">
            <template #thead>
                <vs-tr color="youtube">
                    <vs-th>
                        Name
                    </vs-th>
                    <vs-th>
                        Size
                    </vs-th>
                    <vs-th>
                        Time
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr 
                    v-for="(tr, i) in list" 
                    :key="i" 
                    :data="tr" 
                    :is-selected="selected == tr" 
                    @dblclick.native="open(tr)"
                    @dragover.native="handleDragover($event, tr.type)" 
                    @drop.native="handleDrop(tr.fdid)"
                    >
                    <vs-td :draggable="tr.type !== 'folder'" @dragstart.native="handleDragstart(tr.fid)" style="position: relative">
                        <box-icon style="position: absolute; top:50%; transform: translateY(-50%);" type='solid' :name='getFileTypeIcon(tr.type)'
                            color="grey" size="1.3rem"></box-icon>
                        <span class="table-span">{{ tr.name }}</span>
                    </vs-td>
                    <vs-td>
                        {{ calculateSize(tr.size) }}
                    </vs-td>
                    <vs-td>
                        {{ tr.timestamp }}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </div>
</template>

<script>
import { calculateSize } from '@/utils/calc'
export default {
    props: ['list', 'selectedItem'],
    data: () => ({
        selected: null
    }),
    watch: {
        selected(val) {
            this.emitUpdateSelected(val)
        },
        selectedItem(val) {
            this.selected = val
        }
    },
    methods: {
        calculateSize,

        async handleDrop(lid) {
            console.log('drop:' + lid)
            this.$store.commit('setDropFolderId', lid)
            await this.$store.dispatch('moveFile')
            this.$emit('refresh')
        }, 

        handleDragover(e, type) {
            if(type === 'folder') e.preventDefault(); 
        },

        handleDragstart(fid) {
            console.log('start:' + fid);
            this.$store.commit('setDragFildId', fid)
        }, 

        open(item) {
            if(item.type==='folder'){
                this.$emit('openFolder', item)
            }
            else {
                this.$emit('handleCopyUrl')
            }
        },

        emitUpdateSelected(item) {
            this.$emit('update:selectedItem', item)
        },

        getFileTypeIcon(type) {
            switch (type) {
                case 'folder':
                    return 'folder';
                case 'image':
                    return 'file-image';
                case 'txt':
                    return 'file-txt';
                case 'word':
                    return 'file-doc';
                case 'pdf':
                    return 'file-pdf';
                case 'zip':
                    return 'file-archive';
                case 'video':
                    return 'videos';
                case 'radio':
                    return 'music';
                default:
                    return 'file-blank';
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .table
        user-select:none;
        background var(--vs-light)
        box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;
        border-radius 12px
        height 400px
        overflow hidden
        margin-bottom 28px


    .table-span
        display block
        padding-left 28px
        white-space nowrap
        overflow hidden
        line-height normal

        &:hover 
            white-space normal 
            
        
</style>