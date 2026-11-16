import { Page, test } from "@playwright/test";
import { Wallet,  } from "../pages/wallet.page";

test('Add Amount', {tag: '@wallet'}, async ({page})=>{
    const wallet = new Wallet(page);

    await wallet.goto()
    await wallet.addAmt()
})

test('Verify transection', {tag: '@wallet'}, async ({page})=>{
    const wallet = new Wallet(page);

    await wallet.goto()
    await wallet.verify()
})