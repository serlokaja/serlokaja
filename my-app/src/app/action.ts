'use server'
import { getCookies } from "next-client-cookies/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
    cookies().delete('Authorization')
    redirect('/')
}

export async function isLoginCek() {
    const { get, set } = getCookies();
    const token = get('Authorization');
    const isLogin = token ? true : false;
    return isLogin
}