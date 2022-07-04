import { useRouter } from "vue-router";

export const useProfile = () => {
    const router = useRouter();

    const navToProfile = () => {
        router.push({ name: 'Profile' });
    }

    return { navToProfile };
}