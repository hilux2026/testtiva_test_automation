import { Page,Locator } from "@playwright/test";

export class Student {
    readonly page:Page;
    // locator
    readonly addStudent: Locator
    readonly studentName : Locator
    readonly studentEmail : Locator
    readonly studentPassword : Locator
    readonly studentPhone : Locator
    readonly saveStudent : Locator
    readonly assignTrainer : Locator
    readonly buyPackage: Locator
    readonly buySubPackage : Locator
    readonly activeInactiveStudent : Locator
    readonly menuBtn : Locator
    readonly editStudentOption : Locator
    readonly editStudentSave :Locator
    readonly table:Locator
    readonly card:Locator
    readonly search:Locator

    constructor(page:Page){
        this.page = page;
        this.addStudent = page.getByRole('button', { name: 'Add Student' })
        this.studentName = page.locator('input[name="name"]')
        this.studentEmail = page.locator('input[name="email"]')
        this.studentPassword = page.getByRole('textbox', { name: 'Password' })
        this.studentPhone = page.getByRole('textbox', { name: '–10 digits' })
        this.assignTrainer = page.locator('select[name="trainer_id"]');
        this.buyPackage = page.getByRole('button', { name: 'IELTS - General' })
        this.buySubPackage = page.locator('#tab-2 label').filter({ hasText: 'IELTS General Portal Price ₹0' })
        this.saveStudent = page.getByRole('button', { name: 'Save Student' })
        this.editStudentSave = page.getByRole('button', { name: 'Edit Student' })
        this.activeInactiveStudent = page.locator('.slider')
        this.menuBtn = page.locator('.menuBtn').first()
        this.editStudentOption = page.getByRole('button', { name: '䔀 Edit Information' })
        this.table = page.getByRole('button', { name: '㶝 Table' })
        this.card = page.getByRole('button', { name: '䉞 Card' })
        this.search = page.getByRole('textbox', { name: 'Search name / email / phone...' })
    }

    async goto(){
        await this.page.goto('trainer/students')
    }

    async addNewStudent(name:string, email:string, password: string, phone: string){
        await this.addStudent.click();
        await this.studentName.fill(name)
        await this.studentEmail.fill(email)
        await this.studentPassword.fill(password)
        await this.studentPhone.fill(phone)
        await this.assignTrainer.selectOption('7')
        await this.buyPackage.click();
        await this.buySubPackage.click();
        await this.saveStudent.click()
    }

    async editStudent(name:string, email:string, password: string, phone: string){
        await this.menuBtn.click()
        await this.editStudentOption.click()
        await this.studentName.fill(name)
        await this.studentEmail.fill(email)
        await this.studentPhone.fill(phone)
        await this.assignTrainer.selectOption('3')
        await this.editStudentSave.click()
    }

    async activeinactiveStudent(){
        await this.menuBtn.click()
        await this.editStudentOption.click()
        await this.activeInactiveStudent.click()
        await this.editStudentSave.click()
    }

    async viewTable(){
        await this.table.click();
        await this.page.screenshot({ path: 'screenshots/trainer-table-view.png' });
    }

    async filterData(){
        await this.card.click()
        await this.search.fill('sumit')
    }
}