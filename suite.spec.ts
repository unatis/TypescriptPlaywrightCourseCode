import { test, expect, type Page, Locator, Download } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

enum CheckBoxState {
    CHECKED = 'checked',
    UNCHECKED = 'unchecked'
}

enum Tabs {
    BUYER,
    SELLER
}

let page: Page;

test('First Test', async ({ page: testPage }) => {

    page = testPage;

    await page.addInitScript(() => {
        const originShadow = Element.prototype.attachShadow;
        Element.prototype.attachShadow = function (init) {
            return originShadow.call(this, {
                ...init, mode: 'open'
            });
        };
    });

    await page.goto('https://automationcoursewebsite.onrender.com/');

    /*await verify_Title_Text("Test page");

    await verify_SeleniumAutomation_Text("Selenium automation");

    //await Click_ThisIsALink_Link();

    await verify_Logo_Image("big-logo.png");

    await verify_ColoredText_Color("rgb(241, 50, 9)");

    await verify_BackgroundedText_Color("rgb(176, 187, 7)");

    //await click_Submit_Button();

    //await click_Arrow_Button();

    await verify_HiddenText_Text("Display none");

    await verify_HiddenText_2_Text("Visibility hidden");

    await setAttribute();

    await select_CarsModels_DropDown("Mercedes");

    //await select_Example_DropDown("youtube");

    await click_Gender_RadioButton("Female");

    await set_TextEditor_TextBox("Hello");

    await set_LastName_TextBox("Dell");

    await verify_LastName_TextBox("LastnameDell");

    await verify_ReadOnly_TextBox("readonly");

    await set_ReadOnly_TextBox("Hello");

    await set_Text_TextArea("Hello");

    await verify_Text_TextArea("Hello");

    await set_HaveBike_Checkbox(CheckBoxState.CHECKED);

    await set_HaveCar_Checkbox(CheckBoxState.UNCHECKED);

    await click_TabMenu_Tab(Tabs.SELLER);

    await print_Table();*/

    //await verify_UserClientIP_Table("Thomas Hardy", "192.168.1.30");

    //await verify_LoginServerIP_Table("John", "10.2.2.100");

    //await set_Password_Textbox("123456");

    //await upload_File("C:\\Users\\YuriGoncharov\\Downloads\\image.png");

    //await download_File_Link("C:\\Users\\YuriGoncharov\\Downloads\\panda.png");

    //await download_File_Button("C:\\Users\\YuriGoncharov\\Downloads\\panda.png");

    //await click_W3Schools_Link();

    //await click_W3Schools_Link_ByUrl();

    //await click_MoreInformation_Link();

    //await click_TryIt_Button();

    //await verify_Dynamic_Element();

    //await verify_Dynamic_Element_2();

    //await click_Star_Icon();

    //await verify_Chart_Canvas();

    //await verify_Chart_Canvas_2();

    //await click_Play_Video();

    //await verify_IsPlaying_Video();

    //await click_Pause_Video();

    //await verify_CanPlayAndPause_Video();

    //await verify_CanPlayAndPause_Audio();

    //await click_YouTube_Video();

    //await move_Text_DragAndDrop();

    //await mouseMove();

    //await click_PageScrollButton_Button();

    //await click_ContainerScrollButton_Button();

    //await click_OpenShadowDom_Button();

    await click_ClosedShadowDom_Button();
});

async function verify_Title_Text(expectedText: string): Promise<void> {

    const pageTitleLocator: Locator = await page.locator('h1#page_title_id');

    const foundPageTitle: string = await pageTitleLocator.innerText();

    if (foundPageTitle !== expectedText) {
        throw new Error(`Found Page title: "${foundPageTitle}" Not equals to expected "${expectedText}"`);
    }

    /*if(foundPageTitle === expectedText){
        console.log(`Found Page title: "${foundPageTitle}" equals to expected "${expectedText}"`);
    }else{
        throw new Error(`Found Page title: "${foundPageTitle}" Not equals to expected "${expectedText}"`);
    }*/

}

async function verify_SeleniumAutomation_Text(expectedText: string): Promise<void> {

    const pageLocator: Locator = await page.locator("//p[@name='free_text_name']");

    const foundText: string = await pageLocator.innerText();

    if (foundText !== expectedText) {
        throw new Error(`Found Page title: "${foundText}" Not equals to expected "${expectedText}"`);
    }
}

async function Click_ThisIsALink_Link(): Promise<void> {

    await page.getByRole('link', { name: 'This is' }).click();
}

async function verify_Logo_Image(expectedImageName: string, expected: boolean = true): Promise<void> {

    const imageAttr = await page.locator("#someimage_id").getAttribute("src");

    if (expected) {
        if (!imageAttr?.includes(expectedImageName)) {
            throw new Error(`Logo image does not include expected src value "${expectedImageName}"`);
        }
    } else {
        if (imageAttr?.includes(expectedImageName)) {
            throw new Error(`Logo image does include expected src value "${expectedImageName}"`);
        }
    }
}

async function verify_ColoredText_Color(expectedColor: string): Promise<void> {

    const textLocator = await page.locator("#colored_text_id");

    const color = await textLocator.evaluate((element) => { return window.getComputedStyle(element).color });

    await expect(textLocator).toHaveCSS('color', expectedColor);

    /*if (!color?.includes(expectedColor)) {
        throw new Error(`Text does not include style color value "${expectedColor}"`);
    }*/
}

async function verify_BackgroundedText_Color(expectedColor: string): Promise<void> {

    const textLocator = await page.locator("#background_colored_text_id");

    //const color = await textLocator.evaluate((element) => { return window.getComputedStyle(element).backgroundColor });

    await expect(textLocator).toHaveCSS('background-color', expectedColor);
}

async function click_Submit_Button(): Promise<void> {

    await page.locator("//form/input[@id='submit_id']").click();

}

async function click_Arrow_Button(): Promise<void> {

    await page.locator("#imagebutton_id").click();
}

async function verify_HiddenText_Text(expectedText: string): Promise<void> {

    const foundText = await page.locator("#display_none_id").textContent();

    if (!foundText?.includes(expectedText)) {
        throw new Error(`Found text : "${foundText}" Not includes to expected "${expectedText}"`);
    }
}

async function verify_HiddenText_2_Text(expectedText: string): Promise<void> {

    const locator = await page.locator("#visibility_text_id");

    await expect(locator).toHaveText(expectedText);
}

async function setAttribute(): Promise<void> {

    const locator = await page.locator("#visibility_text_id");

    await set_CSS_Value(locator, "visibility", "");

    await set_CSS_Value(locator, "visibility", "hidden");

    await set_Attribute_Value(locator, "style", "visibility: ;");

    await set_Attribute_Value(locator, "style", "visibility: hidden;");
}

async function set_CSS_Value(element: Locator, styleName: string, styleValue: string): Promise<void> {

    await element.evaluate(
        (el, args) => {
            const htmlElement = el as HTMLElement;
            if (args.styleValue === '') {
                htmlElement.style.removeProperty(args.styleName);
            } else {
                htmlElement.style.setProperty(args.styleName, args.styleValue);
            }
        }, { styleName, styleValue }
    );
}

async function set_Attribute_Value(element: Locator, attributeName: string, attributeValue: string): Promise<void> {

    await element.evaluate(
        (el, args) => {
            el.setAttribute(args.attributeName, args.attributeValue);
        }, { attributeName, attributeValue }
    );
}

async function select_CarsModels_DropDown(itemToSElect: string): Promise<void> {

    const dropdown = await page.locator("#cars");

    await dropdown.selectOption({ label: itemToSElect });

}

async function select_Example_DropDown(itemToSElect: string): Promise<void> {

    await page.locator("//div[contains(@class,'dropdown')]/button[@data-toggle='dropdown']").click();

    const dropdownMenu = page.locator("//div[contains(@class,'dropdown')]/ul[@class='dropdown-menu']")
    dropdownMenu.waitFor({ state: 'visible', timeout: 2000 });
    //await expect(dropdownMenu).toBeVisible({timeout: 2000});

    const options = dropdownMenu.locator("li a");
    const count = await options.count();

    for (let i = 0; i < count; i++) {

        const option = options.nth(i);
        const foundText = (await option.innerText()).trim();

        if (foundText === itemToSElect) {
            await option.click();
            return;
        }
    }

    throw new Error(`Dropdown does not include expected item "${itemToSElect}"`);
}

async function click_Gender_RadioButton(buttonName: string): Promise<void> {

    switch (buttonName) {
        case "Male":
            await page.locator("#male_id").click();
            break;

        case "Female":
            await page.locator("#female_id").click();
            break;

        case "Other":
            await page.locator("#other_id").click();
            break;
    }
}

async function set_TextEditor_TextBox(textToSet: string): Promise<void> {

    await page.locator("input[name='firstname']").fill(textToSet);
}

async function set_LastName_TextBox(textToSet: string): Promise<void> {

    //await page.locator("#lastname_id").type(textToSet);
    //pressSequentially() добавляет/печатает текст как пользователь
    const textBox = page.locator("#lastname_id");
    await textBox.click();
    await textBox.press('End');
    await textBox.pressSequentially(textToSet);
}

async function verify_LastName_TextBox(expectedText: string): Promise<void> {

    const textBox = page.locator("#lastname_id");
    //const foundText = await textBox.inputValue();

    await expect(textBox).toHaveValue(expectedText);
}

async function verify_ReadOnly_TextBox(expectedText: string): Promise<void> {

    const textBox = page.locator("#lastname_rd_id");
    const foundText = await textBox.inputValue();

    await expect(textBox).toHaveValue(expectedText);
}

async function remove_Attribute(element: Locator, attributeName: string): Promise<void> {

    await element.evaluate(
        (el, attributeName) => {
            el.removeAttribute(attributeName);
        }, attributeName
    );
}

async function create_Attribute(element: Locator, attributeName: string, attributeValue: string): Promise<void> {

    await element.evaluate(
        (el, args) => {
            el.setAttribute(args.attributeName, args.attributeValue);
        }, { attributeName, attributeValue }
    );
}

async function set_ReadOnly_TextBox(textToSet: string): Promise<void> {

    const textBox = page.locator("#lastname_rd_id");
    await remove_Attribute(textBox, "readonly");
    const foundText = await textBox.fill(textToSet);
    await create_Attribute(textBox, "readonly", "readonly");
}

async function set_Text_TextArea(textToSet: string): Promise<void> {

    const textArea = page.locator("#textarea_id");
    await textArea.fill(textToSet);
}

async function verify_Text_TextArea(expectedText: string): Promise<void> {

    const textArea = page.locator("#textarea_id");
    //const foundText = await textArea.inputValue();
    await expect(textArea).toHaveValue(expectedText);
}

async function set_HaveBike_Checkbox(state: CheckBoxState): Promise<void> {

    const checkbox = page.locator("#bike_id");

    const isChecked = await checkbox.isChecked();

    if (state === CheckBoxState.CHECKED) {
        await checkbox.check();
    } else {
        await checkbox.uncheck();
    }
}

async function set_HaveCar_Checkbox(state: CheckBoxState): Promise<void> {

    const checkbox = page.locator("#car_id");

    if (state === CheckBoxState.CHECKED) {
        await checkbox.check();
    } else {
        await checkbox.uncheck();
    }
}

async function click_TabMenu_Tab(tabName: Tabs): Promise<void> {

    switch (tabName) {
        case Tabs.BUYER:
            await page.locator("#tab1_id").click();
            break;
        case Tabs.SELLER:
            await page.locator("#tab2_id").click();
            break;
    }
}

async function print_Table(): Promise<void> {

    await page.locator(".usersrow").first().waitFor();

    const allRows = page.locator(".usersrow");

    const rowCount = await allRows.count();

    for (let i = 0; i < rowCount; i++) {

        const columns = allRows.nth(i).locator('td');
        const columnCount = await columns.count();

        for (let j = 0; j < columnCount; j++) {
            console.log(await columns.nth(j).innerText());
        }

        console.log("\n");
    }
}

async function verify_UserClientIP_Table(userName: string, expectedIP: string): Promise<void> {

    let flgFound: boolean = false;
    let foundUserIP: string = "";
    let flgIpEquals: boolean = false;

    await page.locator(".usersrow").first().waitFor();
    const allRows = page.locator(".usersrow");
    const rowCount = await allRows.count();

    for (let i = 0; i < rowCount; i++) {
        const row = allRows.nth(i);
        const userNameFound = await row.locator(".username").innerText();

        if (userNameFound === userName) {
            flgFound = true;
            foundUserIP = await row.locator(".client").innerText();
            flgIpEquals = foundUserIP === expectedIP;
            break;
        }
    }

    if (!flgFound) {
        throw new Error(`User ${userName} not found in the table`);
    }

    if (!flgIpEquals) {
        throw new Error(`Found user IP ${foundUserIP} not equals to expected ${expectedIP}`);
    }
}

async function verify_LoginServerIP_Table(loginName: string, expectedServerIP: string): Promise<void> {

    let flgFound: boolean = false;
    let foundUserIP: string = "";
    let flgIpEquals: boolean = false;
    let columIndex: number = 0;

    await page.locator(".usersrow").first().waitFor();

    const allTitles = page.locator("//table[@id='dable_id']//tr[@class='userstitle']/th");
    const titleCount = await allTitles.count();

    for (let i = 0; i < titleCount; i++) {
        const title = await allTitles.nth(i).innerText();

        if (title === "Login") {
            columIndex = i + 1;
            break;
        }
    }

    const allRows = page.locator("//table[@id='dable_id']//tr[@class='usersrow']");
    const rowCount = await allRows.count();

    for (let i = 0; i < rowCount; i++) {
        const row = allRows.nth(i);
        const loginNameFound = await row.locator(`//td[${columIndex}]`).innerText();

        if (loginNameFound === loginName) {
            flgFound = true;
            foundUserIP = await row.locator(`//td[${columIndex}]`).innerText();
            flgIpEquals = foundUserIP === expectedServerIP;
            break;
        }
    }

    if (!flgFound) {
        throw new Error(`User ${loginName} not found in the table`);
    }

    if (!flgIpEquals) {
        throw new Error(`Found user IP ${foundUserIP} not equals to expected ${expectedServerIP}`);
    }
}

async function set_Password_Textbox(password: string): Promise<void> {

    await page.locator("input[name='password']").fill(password);
}

async function upload_File(fileName: string): Promise<void> {

    await page.locator("#upload_id").setInputFiles(fileName);
    await page.locator("#upload_submit_id").click();
}

async function download_File_Link(saveAs: string): Promise<void> {

    const downloadPromice = page.waitForEvent('download');
    await page.getByRole("link", { name: 'Download' }).click();
    const download: Download = await downloadPromice;
    await download.saveAs(saveAs);
}

async function download_File_Button(saveAs: string): Promise<void> {

    const downloadForm = page.locator('#download_form_id');

    const downloadLink = await downloadForm.getAttribute("action");

    if (!downloadLink) {
        throw new Error("download link is empty");
    }

    const fileURL = new URL(downloadLink, page.url()).toString();

    const dir = path.dirname(saveAs);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const response = await page.request.get(fileURL);

    if (!response.ok) {
        throw new Error(`Failed to get file. Status : ${response.status} URL : ${fileURL}`);
    }

    fs.writeFileSync(saveAs, await response.body());
}

async function click_W3Schools_Link(): Promise<void> {

    const w3schoolLink = page.getByRole("link", { name: 'Visit W3Schools' });
    const tabPromise = page.waitForEvent('popup');
    await w3schoolLink.click();
    const w3SchoolPage = await tabPromise;

    await w3SchoolPage.waitForLoadState();
    await w3SchoolPage.locator("div[id='subtopnav'] a[title='HTML Tutorial']").click();
    await page.bringToFront();
    await page.getByRole('link', { name: 'This is' }).click();

    await w3SchoolPage.bringToFront();
    await w3SchoolPage.close();
}

async function click_W3Schools_Link_ByUrl(): Promise<void> {

    const context = page.context();

    const openedPages: Page[] = [];

    context.on('page', async (newPage) => {
        openedPages.push(newPage);
        await newPage.waitForLoadState();
    });

    const w3schoolLink = page.getByRole("link", { name: 'Visit W3Schools' });

    await w3schoolLink.click();

    await page.waitForTimeout(3000);

    const allPages = context.pages();

    console.log(`All pages count: ${allPages.length}`);
    console.log(`Opened pages count: ${openedPages.length}`);

    for (const currentPage of allPages) {
        console.log(`Page URL: ${currentPage.url()}`);
    }

    let w3SchoolsPage: Page | undefined;

    for (const currentPage of allPages) {
        if (currentPage.url().includes("w3schools.com")) {//.title()
            w3SchoolsPage = currentPage;
            break;
        }
    }
    if (!w3SchoolsPage) {
        throw new Error("Page not found");
    }
    await w3SchoolsPage.bringToFront();
}

async function click_MoreInformation_Link(): Promise<void> {

    const frame = page.locator("//iframe[1]").contentFrame();
    //const frame = page.locator("iframe").first().contentFrame();
    await frame.getByRole('link', { name: /More information/ }).click();

}

async function click_TryIt_Button(): Promise<void> {

    page.once('dialog', async (dialog) => {
        console.log(dialog.message());

        await page.waitForTimeout(3000);

        await dialog.accept();
    });

    await page.locator("#tryit_id").click();

}

async function verify_Dynamic_Element(): Promise<void> {

    //await page.locator("#ajax_button_id").click();
    //await expect(page.locator("#ajax_id h2")).toHaveText('Dynamic content loaded', { timeout: 12000 });

    const textBlock = page.locator("#ajax_id").locator("h2");
    const oldText = await textBlock.innerText();
    await page.locator("#ajax_button_id").click();
    await expect(textBlock).not.toHaveText(oldText, { timeout: 12000 });
}

async function verify_Dynamic_Element_2(): Promise<void> {

    let flgFound: boolean = false;

    const textBlock = page.locator("#ajax_id").locator("h2");

    await create_Attribute(textBlock, "await", "");

    await page.locator("#ajax_button_id").click();

    for (let i = 0; i < 10; i++) {

        const awaitAttribute = await textBlock.getAttribute("await");

        if (awaitAttribute === null) {
            flgFound = true;
            break;
        }

        await page.waitForTimeout(1000);
    }

    const foundText = await textBlock.innerText();

    if (!flgFound) {
        throw new Error("Text was not changed" + foundText);
    }
}

async function click_Star_Icon(): Promise<void> {

    await page.locator("div.star svg").click();

}

async function verify_Chart_Canvas(): Promise<void> {

    const canvas = page.locator("#myChart");

    //await canvas.screenshot({ path: 'screenshots/salesChart.png' });

    await expect(canvas).toHaveScreenshot('canvas.png', { maxDiffPixelRatio: 0.01 });

}

async function verify_Chart_Canvas_2(): Promise<void> {

    const canvas = page.locator("#myChart");
    const screenPath = "screenshots/salesChart.png";
    const actualBuffer = await canvas.screenshot();

    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    if (!fs.existsSync(screenPath)) {
        fs.writeFileSync(screenPath, actualBuffer);
    }

    const expectedBuffer = fs.readFileSync(screenPath);
    const actualPng = PNG.sync.read(actualBuffer);
    const expectedPng = PNG.sync.read(expectedBuffer);

    if (actualPng.width !== expectedPng.width || actualPng.height !== expectedPng.height) {
        throw new Error("Images have different size");
    }

    const diffPexels = pixelmatch(
        actualPng.data,
        expectedPng.data,
        undefined,
        actualPng.width,
        actualPng.height,
        {
            threshold: 0.2//pixel color diff
        }
    );

    const totalPixels = actualPng.width * actualPng.height;

    const diffRatio = diffPexels / totalPixels;//

    if (diffRatio > 0.01) {
        throw new Error("Images have different size" + diffRatio);
    }

    console.log("Images matched");
}

async function click_Play_Video(): Promise<void> {

    const video = page.locator("//div/video/source[@src='file_example_MP4_480_1_5MG.mp4']/..");

    await video.evaluate((el) => { return (el as HTMLVideoElement).play(); });

}

async function click_Pause_Video(): Promise<void> {

    const video = page.locator("//div/video/source[@src='file_example_MP4_480_1_5MG.mp4']/..");

    await video.evaluate((el) => { return (el as HTMLVideoElement).pause(); });
}

async function verify_IsPlaying_Video(): Promise<void> {

    const video = page.locator("//div/video/source[@src='file_example_MP4_480_1_5MG.mp4']/..");

    const isPaused = await video.evaluate((el) => { return (el as HTMLVideoElement).paused; });

    if (isPaused) {
        throw new Error("Video is paused");
    }
}

async function verify_CanPlayAndPause_Video(): Promise<void> {

    const video = page.locator("//div/video/source[@src='file_example_MP4_480_1_5MG.mp4']/..");

    await video.evaluate((el) => {
        const videoElement = el as HTMLVideoElement;
        videoElement.muted = false;
        return videoElement.play();
    });

    await page.waitForTimeout(1000);

    const isPlaying = await video.evaluate((el) => {
        const videoElement = el as HTMLVideoElement;
        return !videoElement.paused && videoElement.currentTime > 0;
    });

    if (!isPlaying) {
        throw new Error("Video did not start playing");
    }
}

async function verify_CanPlayAndPause_Audio(): Promise<void> {

    const audio = page.locator("//div/audio/source[contains(@src,'file_example_MP3_700KB')]/..");

    await audio.evaluate((el) => {
        const audioElement = el as HTMLAudioElement;
        audioElement.muted = false;
        return audioElement.play();
    });

    await page.waitForTimeout(1000);

    const isPlaying = await audio.evaluate((el) => {
        const audioElement = el as HTMLAudioElement;
        return !audioElement.paused && audioElement.currentTime > 0;
    });

    if (!isPlaying) {
        throw new Error("Audio did not start playing");
    }

    await audio.evaluate((el) => {
        (el as HTMLAudioElement).pause();
    });

    const isPaused = await audio.evaluate((el) => {
        return (el as HTMLAudioElement).paused;
    });

    if (!isPaused) {
        throw new Error("Audio did not paused");
    }
}

async function click_YouTube_Video(): Promise<void> {

    const frame = page.locator("//iframe[contains(@src,'youtube')]").contentFrame();
    const button = frame.locator("button.ytmCuedOverlayPlayButton");
    await button.click();
}

async function move_Text_DragAndDrop(): Promise<void> {

    const source = page.locator("//h1[@id='h1']");
    const target = page.locator("//div[@id='div1']");

    await source.dragTo(target);
    await expect(target.locator("//h1[@id='h1']")).toHaveText("W3Schools.com");
}

async function mouseMove(): Promise<void> {

    await page.locator("#tab2_id").hover();

}

async function click_PageScrollButton_Button(): Promise<void> {

    const button = page.locator("#page_scroll_button");
    await button.scrollIntoViewIfNeeded();
    await button.click();

}

async function click_ContainerScrollButton_Button(): Promise<void> {

    const container = page.locator("#scroll_container");

    await container.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        el.scrollLeft = el.scrollWidth;
    });

    await page.locator("#container_scroll_button").click();

}

async function click_OpenShadowDom_Button(): Promise<void> {

    await page.locator("#open_shadow_button").click();
}

async function click_ClosedShadowDom_Button(): Promise<void> {

    await page.locator("#closed_shadow_button").click();
}
