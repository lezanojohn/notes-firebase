<template>
    <div id="home" class="container-fluid" v-if="isAuthenticated">
        <div class="row">
            <div id="note-list-container" class="col-12 col-sm-6 col-md-7">
                <error-message v-if="hasError" />
                <note-list />
            </div>
            <div id="note-viewer-container" class="col-12 col-sm-6 col-md-5">
                <note-viewer />
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { computed, inject, onMounted, provide, ref } from 'vue';
import ErrorMessage from '@/components/ErrorMessage';
import NoteList from '@/components/NoteList';
import NoteViewer from '@/components/NoteViewer';

export default {
    components: {
        'error-message': ErrorMessage,
        'note-list': NoteList,
        'note-viewer': NoteViewer
    },

    setup() {
        const { isAuthenticated } = useAuth(auth);
        const error = ref(null);
        const notes = inject('notes');

        provide('error', error);

        const hasError = computed(() => {
            return error.value != null;
        });

        onMounted(async () => {
            if (notes.value.hasError) {
                error.value = notes.value.error;
            }
        });

        return { isAuthenticated, notes, hasError };
    }
}
</script>
<style lang="scss">
#note-viewer-container {
    display: none;
}

@media (min-width: 576px) {
    #note-viewer-container {
        display: block;
    }
}
</style>