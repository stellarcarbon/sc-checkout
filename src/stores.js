import { writable } from 'svelte/store'

export const SinkStore = writable({
    onboarded: false,
    pubkey: "",
    userName: "",
    userEmail: "",
    carbonAmount: 1,
    memo: "",
})