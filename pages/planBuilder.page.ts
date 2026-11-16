import { Page, Locator } from "@playwright/test";

export class planBuilder{
    readonly page:Page;
    readonly deactivatePlan : Locator
    readonly createPlanBtn : Locator
    readonly planDays : Locator
    readonly bufferDays : Locator
    readonly mockFocus : Locator
    readonly generatePlan : Locator
    readonly selectPlan : Locator
    readonly savePlan : Locator
    readonly tableView : Locator
    readonly cardView : Locator
    readonly editPlanBtn : Locator
    readonly firstCalenderEdit : Locator
    readonly lastCalenderEdit : Locator
    readonly decreseClass : Locator
    readonly increaseClass : Locator
    readonly saveDay : Locator

    constructor(page:Page){
        this.page = page;
        this.deactivatePlan = page.getByRole('button', { name: 'Deactivate' })
        this.createPlanBtn = page.getByRole('button', { name: 'Create Plan' })
        this.planDays = page.locator('#apPlanDays')
        this.bufferDays = page.locator('#apBufferDays')
        this.mockFocus = page.locator('#apMockFocus')
        this.generatePlan = page.getByRole('button', { name: 'Generate 3 Plans' })
        this.selectPlan = page.getByRole('button', { name: 'Select This Plan' })
        this.savePlan = page.getByRole('button', { name: 'Save As Active' })
        this.tableView = page.getByRole('button', { name: '㶝 Table' })
        this.cardView = page.getByRole('button', { name: '䉞 Card' })
        this.editPlanBtn = page.getByRole('button', { name: 'Create / Edit Plan' })
        this.firstCalenderEdit = page.getByRole('button', { name: '㾲' })
        this.lastCalenderEdit = page.locator('div:nth-child(10) > .d > .flex > .ap-edit-btn')
        this.decreseClass = page.getByRole('button', { name: '−' })
        this.increaseClass = page.getByRole('button', { name: '+' })
        this.saveDay = page.getByRole('button', { name: 'Save Day' })

    }

    async goto(){
        await this.page.goto('owner/plan-builder')
    }

    async deactive(){
        await this.deactivatePlan.click();
    }

    async createPlan(){
        await this.createPlanBtn.click();
        await this.planDays.fill('10')
        await this.bufferDays.fill('0')
        await this.mockFocus.selectOption('end');
        await this.generatePlan.click();
        await this.selectPlan.nth(1).click();
        await this.tableView.click()
        await this.savePlan.click()
    }

    async editPlan(){
        await this.editPlanBtn.click();
        await this.tableView.click()
        await this.firstCalenderEdit.first().click()
        await this.decreseClass.first().click()
        await this.saveDay.click()
        await this.cardView.click()
        await this.lastCalenderEdit.click()
        await this.increaseClass.first().click()
        await this.saveDay.click()

    }
}