import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

export const useAuthentication = () => {

    const router = useRouter();

    const logIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then(() => {
            router.push({ name: 'Home' });
        }).catch((error) => {
            // eslint-disable-next-line
            console.error(error);
        });
    };
    
    const logOut = () => {
        signOut(auth).then(() => {
            router.push({ name: 'Home' });
        }).catch((error) => {
            // eslint-disable-next-line
            console.error(error);
        });
    };

    return { logIn, logOut };
};