<template>
    <div id="not-found" class="d-flex flex-wrap justify-content-center">
        <legend class="text-center">Página no encontrada</legend>
        <router-link 
            class="btn btn-cgreen1"
            :to="{ name: 'Home' }"
        >
            Ir al inicio
        </router-link>
    </div>
</template>