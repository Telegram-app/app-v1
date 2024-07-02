import axios from 'axios';
import { TgUserData } from '@/models/user.model.ts';

const API_URL = 'http://localhost:3001' + '/api/user/'

class UserService {
    async initUser(user: TgUserData) {
        return axios.post(API_URL + 'initUser', {user}, {
            withCredentials: true
        }).then((response) => {
            console.log(response);
            return response
        })
    }

    getUserData() {
        return axios.get(API_URL + 'getUserData')
    }
}

export default new UserService();