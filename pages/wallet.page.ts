import { Page, Locator, expect } from "@playwright/test";

export class Wallet {
    readonly page:Page
    readonly rechargeWltBtn : Locator
    readonly finalRcrgWltBtn : Locator
    readonly fillAmt : Locator
    readonly payNow : Locator
    readonly search : Locator
    readonly searchItem : Locator
    readonly cardView : Locator

    constructor(page:Page) {
        this.page = page
        this.rechargeWltBtn = page.getByRole('button', { name: 'Recharge Wallet' })
        this.fillAmt = page.getByPlaceholder('e.g.')
        this.payNow = page.getByRole('button', { name: 'Pay ₹118.00 Securely' })
        this.finalRcrgWltBtn = page.getByRole('button', { name: 'Recharge Wallet', exact: true }) 
        this.search =  page.getByRole('textbox', { name: 'Search transactions, trainer' })
        this.searchItem = page.getByRole('cell', { name: 'PTE' })
        this.cardView = page.getByRole('button', { name: '䉞 Card' })
    }

    async goto() {
        await this.page.goto('owner/wallet-dashboard');
    }

    async addAmt() {
        await this.rechargeWltBtn.click()
        await this.fillAmt.fill('100')
        await this.finalRcrgWltBtn.click()
        await this.payNow.click()
    }

    async verify(){
        await this.search.fill('pte')
        await expect(this.searchItem.first()).toBeVisible()
        await this.cardView.click()
        
    }
}