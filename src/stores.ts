import type { StellarWalletsKit } from 'stellar-wallets-kit'
import { writable } from 'svelte/store'
import { PaymentAsset } from './client'                                                                                                         

export const WalletStore = writable<StellarWalletsKit>(null)

export const SinkStore = writable({
    onboarded: false,
    pubkey: "",
    userName: "",
    userEmail: "",
    carbonAmount: 1,
    paymentAsset: PaymentAsset.ANY, 
    memo: "",
})