<template>
    <div id="note-viewer" v-if="selectedNote != null">
        <div class="grid-container">
            <div class="top-container">
                <div class="info">
                    <p><span class="title">Creado el:</span><span class="data">{{ createDate }}</span></p>
                    <p><span class="title">Editado el:</span><span class="data">{{ updateDate }}</span></p>
                </div>
                <div class="actions">
                    <button class="btn btn-warning" @click="editNote">Editar</button>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Borrar</button>
                </div>
            </div>
            <div class="title-container">
                <legend>{{ title }}</legend>
            </div>
            <div class="text-container">
                <p v-html="text"></p>
            </div>
            <error-message class="mt-5" v-if="hasError" />
            <delete-modal :id="selectedNote.id" />
        </div>
    </div>
</template>

<script>
import { computed, provide, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorMessage from '@/components/ErrorMessage';
import DeleteModal from '@/components/DeleteModal';

export default {
    components: {
        'error-message': ErrorMessage,
        'delete-modal': DeleteModal
    },

    setup() {
        const router = useRouter();
        const error = ref(null);
        const selectedNote = inject('selectedNote');

        provide('error', error);

        const convertTimestampToDate = (timestamp) => {
            const date = timestamp.toDate();
            const DD = date.getDate();
            const MM = date.getMonth();
            const YYYY = date.getFullYear();
            const hh = date.getHours();
            const mm = date.getMinutes();
            return DD + '/' + MM + '/' + YYYY + ' ' + hh + ':' + mm;
        };

        const title = computed(() => {
            return selectedNote != null ? selectedNote.value.title : '';
        });

        const text = computed(() => {
            return selectedNote != null ? selectedNote.value.text.replace(/\n/g, '<br>\n') : '';
        });

        const createDate = computed(() => {
            return selectedNote != null ? convertTimestampToDate(selectedNote.value.createDate) : '';
        });

        const updateDate = computed(() => {
            return selectedNote != null ? convertTimestampToDate(selectedNote.value.updateDate) : '';
        });

        const hasError = computed(() => {
            return error.value != null;
        });

        const editNote = () => {
            router.push({
                name: 'EditNote',
                params: {
                    id: selectedNote.value.id
                }
            });
        };

        return { selectedNote, title, text, createDate, updateDate, editNote, hasError };
    },
}
</script>

<style lang="scss" scoped>
#note-viewer {
    legend {
        font-size: 14px;
        font-weight: 700;
    }
    .grid-container {
        display: grid;
        grid-template-rows: 65px auto 1fr;
        row-gap: 15px;
        background-color: ivory;
        padding: 10px;
        -moz-box-shadow:    0 3px 10px rgb(0 0 0 / 0.2);
        -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        box-shadow:         0 3px 10px rgb(0 0 0 / 0.2);
        .top-container {
            display: grid;
            grid-template-rows: 40px 25px;
            grid-template-areas: 
                "actions"
                "info";
            .info {
                grid-area: info;
                // margin-top: 3px;
                p {
                    margin: 0;
                    font-size: 11px;
                    color: gray;
                    .title {
                        margin-right: 7px;
                    }
                    .data {
                        font-weight: 600;    
                    }
                }
            }
            .actions {
                grid-area: actions;
                display: flex;
                justify-content: space-between;
                button {
                    font-size: 12px;
                    height: 25px;
                    line-height: 12px;
                }
            }
        }
        .title-container {
            legend {
                font-size: 20px;
                margin: 0;
            }
        }
    }
}
</style>