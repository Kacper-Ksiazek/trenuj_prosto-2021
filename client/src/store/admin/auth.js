import { API_ADDRESS } from "../index";
import axios from "axios";
//
export default {
    namespaced: true,
    actions: {
        async login(_, credentials) {
            const { email, password } = credentials;
            const { data: feedback } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
                email,
                password
            });
            if (feedback.result === "negative") return feedback;
            if (feedback.result === "positive") {
                delete feedback.result;
                localStorage.setItem("user", JSON.stringify(feedback));
                return { result: "positive" };
            }
        },
        async logout() {
            const user = JSON.parse(localStorage.getItem("user"));
            const url = `${API_ADDRESS}/api/auth/logout`;
            const data = { refreshToken: user.refreshToken };
            const options = {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            };
            //
            await axios.post(url, data, options);
            localStorage.setItem("user", JSON.stringify({}));
            location.reload();
        }
    }
};