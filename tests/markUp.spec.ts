import test from "@playwright/test";
import { markUp } from "../pages/markUpPricing.page";

test('Mark Up pricing', {tag : '@markUP'}, async ({page}) =>{
    const markup = new markUp(page);

    await markup.goto();
    await markup.marking()
    await markup.saveAll()

})

test('Reset markup', {tag:'@markUP'}, async ({page}) => {
    const markup = new markUp(page);

    await markup.goto();
    await markup.resetMarkup()
    await markup.saveAll();
})

