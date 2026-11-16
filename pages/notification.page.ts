import { Locator, Page } from "@playwright/test";

export class NotificationPage {
    readonly page: Page;

    // Locators
    readonly Notification: Locator;
    readonly SelectStudent: Locator;
    readonly Search: Locator;
    readonly StudentCheckbox: Locator;
    readonly Continue: Locator;
    readonly ImportantUpdate: Locator;
    readonly NotificationMessage: Locator;
    readonly ToastBottomRight: Locator;
    readonly Link: Locator;
    readonly ButtonLabel: Locator;
    readonly SendNotification: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.Notification = page.getByRole('link', { name: '䒌 Notification' });

        this.SelectStudent = page.getByRole('button', {
            name: 'Select Student'
        });

        this.Search = page.getByRole('textbox', {
            name: 'Search'
        });

        this.StudentCheckbox = page.locator(
            'div:nth-child(1740) > .flex.items-start > .modal-checkbox-ui'
        );

        this.Continue = page.getByRole('button', {
            name: '㶨 Continue'
        });

        this.ImportantUpdate = page.getByRole('textbox', {
            name: 'e.g. Important Update'
        });

        this.NotificationMessage = page.getByRole('textbox', {
            name: 'Write your notification'
        });

        this.ToastBottomRight = page.getByRole('radio', {
            name: 'Toast Bottom-right popup,'
        });

        this.Link = page.getByRole('textbox', {
            name: 'https://example.com'
        });

        this.ButtonLabel = page.getByRole('textbox', {
            name: 'Enter Button Label'
        });

        this.SendNotification = page.getByRole('button', {
            name: '䚶 Send Notification'
        });
    }

    async goto() {
        await this.page.goto('owner/broadcast');
    }

    async createNotification() {
        await this.Notification.click();
        await this.SelectStudent.click();
        await this.Search.fill('sumit');
        await this.StudentCheckbox.click();
        await this.Continue.click();
        await this.ImportantUpdate.fill('Only for Testing');
        await this.NotificationMessage.fill('testing only message');
        await this.ToastBottomRight.check();
        await this.Link.fill('https://demo.com');
        await this.ButtonLabel.fill('Test Button');
        await this.SendNotification.click();
    }
}