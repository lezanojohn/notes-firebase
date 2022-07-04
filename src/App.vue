<template>
    <div id="app-container">
        <div id="navbar-container">
            <navbar />
        </div>
        <div id="content-container" class="container-fluid">
            <div id="content" class="container bg-ccream1">
                <loading-spinner v-if="loadingApp" />
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { watch, ref, provide } from 'vue';
import { initFirebaseAuth } from '@/firebase';
import { useNotes } from '@/composables/useNotes';
import NavBar from '@/components/NavBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import store from "@/store";

export default {
    components: {
        'navbar': NavBar,
        'loading-spinner': LoadingSpinner
    },

    setup() {
        const { getNotes, loadingNote } = useNotes();
        const notes = ref([]);
        const selectedNote = ref(null);
        const loadingApp = ref(false);

        provide('notes', notes);
        provide('selectedNote', selectedNote);
        provide('loadingApp', loadingApp);

        const authStateObserver = async (user) => {
            if (user) {
                store.commit('setUserID', user.uid);
                notes.value = await getNotes(user.uid);
                if (notes.value.length > 0) {
                    selectedNote.value = notes.value[0];
                }
            } else {
                store.commit('setUserID', null);
                notes.value = [];
                selectedNote.value = null;
            }
        };

        initFirebaseAuth(authStateObserver);

        watch(loadingNote, (value) => {
            loadingApp.value = value;
        });

        return { loadingApp };
    },
};
</script>

<style lang="scss" scoped>
#app-container {
    display: grid;
    grid-template-rows: 56px 1fr;
    #content-container {
        overflow: auto;
        max-height: calc(100vh - 70px);
        #content {
            overflow: inherit;
            padding: 20px 12px;
            min-height: calc(100vh - 70px);
        }
    }
    #content-container::-webkit-scrollbar,
    #content::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    #content-container::-webkit-scrollbar-track,
    #content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #faedcd; 
        border-radius: 10px;
    }
    #content-container::-webkit-scrollbar-thumb,
    #content::-webkit-scrollbar-thumb {
        background: #d4a373; 
        border-radius: 10px;
    }
    #content-container::-webkit-scrollbar-thumb:hover,
    #content::-webkit-scrollbar-thumb:hover {
        background: #b68758; 
    }
}
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
    .container {
        max-width: 690px !important;
    }
}
// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
    .container {
        max-width: 1200px !important;
    }
}
</style>