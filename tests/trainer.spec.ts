import { test } from '@playwright/test'
import { Trainer } from '../pages/trainer.page'
import { generateData } from '../utils/dataGenerator';

test('Add New Trainer & Grant all future access', { tag : '@trainer'}, async ({page}) => {
    const trainer = new Trainer(page);

    await trainer.goto();
    const data = generateData();

    await trainer.addNewTrainer(
       data.name,
       data.email,
       data.phone,
       data.password
    )
})

test('Edit Trainer & Select all packages', { tag : '@trainer'}, async ({page}) => {
    const trainer = new Trainer(page);

    await trainer.goto();
    const data = generateData();

    await trainer.editNewTrainer(
        data.name,
        data.email,
        data.phone,
        data.password
    )
})

test('Active/Inactive trainer', {tag: '@trainer'}, async ({page}) =>{
    const trainer = new Trainer(page);
    await trainer.goto();
    await trainer.activeInactiveTrainer();
})

test('Trainer Table view', {tag: '@trainer'}, async ({page})=>{
    const trainer = new Trainer(page);
    await trainer.goto();
    await trainer.viewTable()
})

test('Apply filter for trainer', {tag: '@trainer'}, async ({page})=>{
    const trainer = new Trainer(page)
    await trainer.goto();
    await trainer.filterData();
})



