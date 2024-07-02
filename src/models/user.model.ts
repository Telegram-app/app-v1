
export type TgUserData = {
    allows_write_to_pm: boolean;
    first_name: string;
    id: number;
    is_premium: boolean;
    language_code: string;
    last_name: string;
    username: string;
    photo_url?: string;
}

export type UserData = {
    id: number;
    username?: string;
    avatar?: string;
}
