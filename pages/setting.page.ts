import { Page,Locator } from "@playwright/test";

export class Setting {
    readonly page:Page;
    // locator
    

    constructor(page:Page){
        this.page = page;
        
    }

    async goto(){
        await this.page.goto('trainer/students')
    }

    

}