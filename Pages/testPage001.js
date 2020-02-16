import { t, Selector } from 'testcafe'

//Locators
class testPage001 {
    constructor() {
        this.openNewPage_Link = Selector('a').withText('Open New Page');
        this.sbtBtn = Selector('#submitButton');
        this.firstName = Selector('#text1');
        this.lastName = Selector('#text2');
        this.hiddenField = Selector('#hidden1');
        this.boatCB = Selector('#check3');
        this.radioBtn1 = Selector('#radio1');
        this.radioBtn2 = Selector('#radio2');
        this.radioBtns = Selector('input[type="radio"]');
        this.uploadFile = Selector('input[name="img"]');
        this.carsList = Selector('#Carlist');
        this.carsOption = this.carsList.find('option');
        this.confirmBtn = Selector('button[onclick="myFunction()"]');
        this.confirmMessage = Selector('#demo');
        this.countryList = Selector('select[name="FromLB"]');
        this.countryOption = this.countryList.find('option');
        this.moveCountryBtn = Selector('input[value="->"]');
        this.countryList2 = Selector('select[name="ToLB"]');
    }

//==================================Functions======================================
 
async checkDisableFieldsdBforeActivateSubmit() {
    await t.expect(this.sbtBtn.hasAttribute('disabled')).ok();
    //1.3: firstname is enabled
    await t.expect(this.firstName.hasAttribute('enabled')).ok();
    //1.4: last name is disabled
    await t.expect(this.lastName.hasAttribute('disabled')).ok();
    //1.5: hidden field is hidden
    await t.expect(this.hiddenField.exists).ok()
    await t.takeScreenshot()
    //1.6: then wait until submit button is active
    await t.takeElementScreenshot(this.sbtBtn)
}
//====================================
 async checkEnabledFieldsActivateSubmit() {
    //1.7: and make sure first name -> disabled,last name -> enabled ,hidden is not hidden anymore
    await t.expect(this.firstName.hasAttribute('disabled')).ok();
    await t.expect(this.lastName.hasAttribute('disabled')).notOk();
    await t.expect(this.hiddenField.exists).notOk();
    await t.takeScreenshot()
}
//====================================
 async  chooseIHaveABoat() {
    await t.expect(this.boatCB.checked).notOk();
    await t.takeElementScreenshot(this.boatCB);
    await t.click(this.boatCB);
    await t.expect(this.boatCB.checked).ok();
    await t.takeElementScreenshot(this.boatCB);
}
//=====================================
 async  defaultRadioStat() {
    //QUESTION: How to get all the checkboxes & put them into a list to check for their count in case it is needed
    await t.expect(this.radioBtn1.checked).notOk() && expect(this.radioBtn2.checked).notOk();
}
//=====================================

 async  checkSubmitEnabled() {
    await t.expect(this.sbtBtn.hasAttribute('disabled')).notOk({ timeout: 15000 });
    await t.takeElementScreenshot(this.sbtBtn);
 }
//====================================
 async  checkPageLoaded() {

    await t.expect(this.openNewPage_Link.exists).ok({ timeout: 5000 });
 }
//=======================================
async SelectCountry(firstCountry, secondCountry)
{
    await t
    .click(this.countryOption.withText(firstCountry))
    .click(this.moveCountryBtn)
    .click(this.countryOption.withText(secondCountry))
    .click(this.moveCountryBtn)
    .takeElementScreenshot(this.countryList)
    .takeElementScreenshot(this.countryList2);

await t.expect(this.countryList2.innerText).contains(firstCountry) &&
    expect(this.countryList2.innerText).contains(secondCountry);
await t.expect(this.countryList.innerText).notContains(firstCountry) &&
    expect(this.countryList.innerText).notContains(secondCountry)
}

}


export default testPage001;