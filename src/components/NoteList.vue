<template>
    <div id="note-list">
        <legend v-if="notes.length == 0 && loadingApp">Cargando notas...</legend>
        <legend v-if="notes.length == 0 && !loadingApp">Sin notas</legend>
        <div class="flex-container">
            <div class="note"
                v-for="note in notes"
                :key="note.id"
                :class="'bgc-' + note.color"
                @click="handleSelectedNote(note)"
            >
                <h6 class="title">{{ note.title }}</h6>
                <p class="text" v-html="note.text.replace(/\n/g, '<br>\n')"></p>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

export default {
    setup() {
        const { width } = useWindowSize();
        const router = useRouter();

        const notes = inject('notes');
        const selectedNote = inject('selectedNote');
        const loadingApp = inject('loadingApp');

        const handleSelectedNote = (note) => {
            selectedNote.value = note;
            if (width.value < 576) {
                router.push({
                    name: 'EditNote',
                    params: {
                        id: selectedNote.value.id
                    }
                });
            }
        };

        return { notes, loadingApp, handleSelectedNote };
    },
}
</script>

<style lang="scss" scoped>
#note-list {
    legend {
        font-size: 14px;
        font-weight: 700;
    }
    .flex-container {
        display: flex;
        row-gap: 10px;
        column-gap: 10px;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        .note {
            width: 100%;
            height: 50px;
            border: 1px solid black;
            padding: 5px;
            cursor: pointer;
            .title {
                font-size: 11px;
                font-weight: 900;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 3px;
            }
            .text {
                margin: 0;
                max-height: 24px;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                font-size: 10px;
                line-height: 12px;
            }
        }
    }
    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {
        .flex-container {
            .note {
                .title {
                    font-size: 12px;
                }
            }
        }
    }
    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
        .flex-container {
            .note {
                width: 30%;
                min-width: 120px;
                max-width: 200px;
                height: 120px;
                padding: 10px;
                .title {
                    font-size: 14px;
                }
                .text {
                    max-height: 70px;
                    font-size: 11px;
                    line-height: 14px;
                }
            }
        }
    }
    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
        .flex-container {
            .note {
                .title {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>