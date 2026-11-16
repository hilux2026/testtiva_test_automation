import { Page, Locator } from "@playwright/test";

export class markUp {
    readonly page : Page
    readonly profit : Locator
    readonly showcase : Locator
    readonly markUpOn : Locator
    readonly markUpOff : Locator
    readonly apply : Locator
    readonly save : Locator

    constructor(page:Page){
        this.page = page

        this.markUpOn = page.getByRole('button', { name: 'Markup On' })
        this.markUpOff = page.getByRole('button', { name: 'Markup Off' })
        this.profit = page.locator('#section-1').getByPlaceholder('Profit %')
        this.showcase = page.locator('#section-1').getByPlaceholder('Showcase %')
        this.apply = page.getByRole('button', { name: 'Apply' })
        this.save = page.getByRole('button', { name: '䤇 Save All' })
    }

    async goto() {
        await this.page.goto('owner/package-pricing')
    }

    async marking(){
        await this.markUpOn.click();
        await this.profit.fill('5')
        await this.apply.first().click();

        await this.showcase.fill('5')
        await this.apply.nth(1).click();
    }

    async saveAll(){
        await this.save.click()
    }

    async resetMarkup(){
        await this.markUpOff.click()
    }
}