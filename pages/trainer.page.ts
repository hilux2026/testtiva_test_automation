import { Page, Locator } from '@playwright/test';

export class Trainer {
    readonly page: Page;
    // locators
    readonly addTrainer : Locator;
    readonly trainerName : Locator;
    readonly trainerEmail : Locator;
    readonly trainerPhone : Locator;
    readonly trainerPassword : Locator;
    readonly grantFutureAccessAll : Locator;
    readonly selectAllPackage : Locator;
    readonly saveTrainer : Locator;
    readonly editTrainer : Locator;
    readonly filterAccess: Locator;
    readonly slider : Locator;
    readonly table : Locator;
    readonly card : Locator;
    readonly search : Locator;

    constructor(page:Page){
        this.page = page;       
        // assign  locators
        this.addTrainer = page.getByRole('button', { name: 'Add Trainer' })
        this.trainerName = page.getByRole('textbox', { name: 'Enter Trainer Name' })
        this.trainerEmail = page.getByRole('textbox', { name: 'Enter Email Address' })
        this.trainerPassword = page.getByRole('textbox', { name: 'Password' })
        this.trainerPhone =  page.getByRole('textbox', { name: 'Phone' })
        this.grantFutureAccessAll = page.getByRole('button', { name: 'Grant Future Access All' })
        this.saveTrainer = page.getByRole('button', { name: 'Save Trainer' })
        this.editTrainer = page.getByRole('button', { name: '㾲' });
        this.selectAllPackage = page.getByRole('button', { name: 'Select All Packages' })
        this.filterAccess = page.locator('label').filter({ hasText: 'IELTS Academic' })
        this.slider = page.locator('.slider')
        this.table = page.getByRole('button', { name: '㶝 Table' })
        this.card = page.getByRole('button', { name: '䉞 Card' })
        this.search = page.getByRole('textbox', { name: 'Search name / email / phone...' })
    }    

    async goto() {
    await this.page.goto('owner/trainers');
    }

    async addNewTrainer(name: string, email: string, phone: string, password: string){
        await this.addTrainer.click();
        await this.trainerName.fill(name);
        await this.trainerEmail.fill(email);
        await this.trainerPhone.fill(phone);
        await this.trainerPassword.fill(password);
        await this.grantFutureAccessAll.click();
        await this.saveTrainer.click();
    }
    
    async editNewTrainer(name: string, email: string, phone: string, password: string){
        await this.editTrainer.first().click();
        await this.trainerName.fill(name);
        await this.trainerEmail.fill(email);
        await this.trainerPhone.fill(phone);
        await this.trainerPassword.fill(password);
        await this.selectAllPackage.click();
        await this.filterAccess.click();
        await this.saveTrainer.click();
    }

    async activeInactiveTrainer(){
        await this.editTrainer.first().click();
        await this.slider.click();
        await this.saveTrainer.click();
    }
    
    async viewTable(){
        await this.table.click();
        await this.page.screenshot({ path: 'screenshots/trainer-table-view.png' });
    }

    async filterData(){
        await this.card.click()
        await this.search.fill('trainer1@gmail.com')
    }
}