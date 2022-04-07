import axios from "axios";
import {useUserStore} from "@/store";

export function parseJWT(token: string): Record<string, unknown> {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}


export async function updateUserStatus(){
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get("http://localhost:3000/google/isAuthenticated", {
            validateStatus(status) {
                const userStore = useUserStore();

                if(status === 200){
                    userStore.$patch({authState: "Logged"});
                    userStore.$state.user = parseJWT(token);
                    return true;
                }
                localStorage.removeItem('token');
                userStore.$patch({authState: "NotLogged"});
                return true;
            }
        })
    }
}
