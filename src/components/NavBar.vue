<template>
    <nav id="navbar" class="navbar fixed-top navbar-expand-lg bg-cgreen1">
        <div class="container-fluid">
            <router-link class="navbar-brand me-auto" :to="{ name: 'Home' }">NoteApp</router-link>

            <button
                v-if="!isAuthenticated"
                class="btn btn-ccream1"
                @click="logIn"
            >
                Acceder
            </button>

            <button
                v-if="isAuthenticated"
                id="navbar-toggler"
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-collapse"
                aria-controls="navbar-collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div v-if="isAuthenticated" id="navbar-collapse" class="collapse navbar-collapse">
                <router-link :to="{ name: 'Home' }" class="nav-link ms-auto me-4">Inicio</router-link>
                <router-link :to="{ name: 'NewNote' }" class="nav-link">Crear Nota</router-link>
                <button class="btn btn-danger ms-auto" type="button" @click="logOut">Salir</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthentication } from '@/composables/useAuthentication';
import { useProfile } from '@/composables/useProfile';
import { useAuth } from '@vueuse/firebase';
import { auth } from '@/firebase';

export default {
    setup() {
        const { logIn, logOut } = useAuthentication();
        const { navToProfile } = useProfile();
        const { isAuthenticated } = useAuth(auth);

        return {
            logIn,
            logOut,
            navToProfile,
            isAuthenticated
        };
    },
};
</script>

<style lang="scss" scoped>
#navbar {
    #navbar-collapse {
        .nav-link {
            margin-top: 15px;
        }
        button {
            display: block;
            margin-left: auto;
        }
    }
}
// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    #navbar {
        #navbar-collapse {
            .nav-link {
                margin-top: 0;
            }
            button {
                display: inline-block;
                margin-left: 0;
            }
        }
    }
}
</style>