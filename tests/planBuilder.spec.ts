import test from "@playwright/test";
import { planBuilder } from "../pages/planBuilder.page";

test('Deactivate Plan Builder', {tag : '@markUP'}, async ({page}) =>{
    const markup = new planBuilder(page);

    await markup.goto();
    await markup.deactive();
})

test('Create Plan Builder', {tag : '@markUp'}, async ({page})=>{
    const markup = new planBuilder(page)

    await markup.goto()
    await markup.createPlan();
})

test('Edit Plan Builder', { tag:'@markup'}, async ({page})=>{
    const markup = new planBuilder(page)

    await markup.goto();
    await markup.editPlan()
})