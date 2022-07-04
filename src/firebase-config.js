const config = {
    apiKey: "AIzaSyCTyb9OEKkuOkgpAdEgYfwsYf7VNUG5w_M",
    authDomain: "udemy-bluuweb-api-notas.firebaseapp.com",
    projectId: "udemy-bluuweb-api-notas",
    storageBucket: "udemy-bluuweb-api-notas.appspot.com",
    messagingSenderId: "284813203063",
    appId: "1:284813203063:web:c298f4edc61260cbaed872"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
        'Add your web app\'s configuration object to firebase-config.js');
    } else {
        return config;
    }
}