import { test, expect } from '@playwright/test';
import { Student } from '../pages/student.page';
import { generateData } from '../utils/dataGenerator';

test('Add Student & buy Package', {tag: '@student'}, async ({ page }) => {
  
    const studnet = new Student(page)
    await studnet.goto();

    const data = generateData();

    await studnet.addNewStudent(
        data.name,
        data.email,
        data.password,
        data.phone
    )

});

test('Edit student & select diffrent package', {tag:'@student'}, async ( { page})=>{
    const student = new Student(page);
    await student.goto();

    const data = generateData()
    await student.editStudent(
        data.name,
        data.email,
        data.password,
        data.phone
    )
})

test('Active/Inactive student', { tag: '@student'}, async ({page}) => {
    const student = new Student(page);

    await student.goto();
    await student.activeinactiveStudent();

})

test('Student Table view', { tag: '@student'}, async ({page}) => {
    const student = new Student(page);

    await student.goto();
    await student.viewTable();
})

test('Apply filter for student', {tag: '@trainer'}, async ({page})=>{
    const trainer = new Student(page)
    await trainer.goto();
    await trainer.filterData();
})
