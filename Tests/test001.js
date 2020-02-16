import { Selector } from 'testcafe'
import { ClientFunction } from 'testcafe';
require('dotenv').config()
import helper001 from '../helper';
import testPage001 from '../Pages/testpage001';
const dataSet4 = require("../TestData/uploadFilesNames.json");
const dataSet6 = require("../TestData/nativeMessage.json");
const dataSet7 = require("../TestData/countryData.json");

const tPage = new testPage001();
const helperFunctions = new helper001();
//Locators

//=======================================
fixture`Assignments002`
  .page`${process.env.main_url}`

/*
1)Make sure when page loads ,submit button is disabled , firstname is enabled,last name is disabled 
,hidden field is hidden then wait until submit button is activeand make sure first name -> disabled,
last name -> enabled ,hidden is not hidden anymore
*/
test('TC#1-Submit Button', async t => {

  await tPage.checkPageLoaded();
  await tPage.checkDisableFieldsdBforeActivateSubmit();
  await tPage.checkSubmitEnabled();
  await t.takeElementScreenshot(tPage.sbtBtn);
  await tPage.checkEnabledFieldsActivateSubmit();

});


//2:  make sure "I have a boat" is not checked ,and check it then make sure it got checked
 test('TC#2 - I have a boat', async t => {

         await tPage.chooseIHaveABoat();

 });

 

// /*3)Make sure radio button nothing choosen,then choose one and make sure other is not selected,
// then choose the other and make sure the other not selected
// */
 test('TC#3 - Radio buttons handling', async t => {
        await tPage.defaultRadioStat();
         await helperFunctions.selectCheckBox(tPage.radioBtn1, tPage.radioBtn2);
        await helperFunctions.selectCheckBox(tPage.radioBtn2,tPage.radioBtn1);

 });
 

/*

// /*4)upload a file*/
dataSet4.forEach(element => {
test('TC#4 - Upload Files', async t => {
        //"setTestSpeed" is used for debugging purposes only
        //await t.setTestSpeed(0.7);
        //  helperFunctions.checkSubmitEnabled();
        await t.setFilesToUpload(tPage.uploadFile, '../Uploads/'+element.fileName);
        //"eval" is used as we are dealing with "__$$clientFunction$$"
        //I think there is something better to use
        //const valueProp = await t.eval(() => document.querySelector('input[name="img"]').value);
        const nameProp = await t.eval(() => document.querySelector('input[name="img"]').files[0].name);
        //console.log(`Name is: `+nameProp)
        //console.log(`Value is: `+valueProp)
        await t.expect(nameProp).contains(element.fileName);
        await t.takeElementScreenshot(tPage.uploadFile);
});
});

// /*5)choose from the dropdown ,by a lot of ways like "by value,by index ,by text and by navigation"*/
test('TC#5 - Select from Drobdown', async t => {
        //"setTestSpeed" is used for debugging purposes only
        // await t.setTestSpeed(0.7);
        //  helperFunctions.checkSubmitEnabled();
        await t
                .click(tPage.carsList)
                .click(tPage.carsOption.withText('BMW'))
                .expect(tPage.carsList.value).eql('BMW Car')
                .takeElementScreenshot(tPage.carsList);

        await t
                .click(tPage.carsList)
                .click(tPage.carsOption.withAttribute('value', 'Toyota Car'))
                .expect(tPage.carsList.value).eql('Toyota Car')
                .takeElementScreenshot(tPage.carsList);

        await t
                .click(tPage.carsList)
                .click(tPage.carsList.child(6))
                .expect(tPage.carsList.value).eql('Maruti Car')
                .takeElementScreenshot(tPage.carsList);

});

// /*6)click on "show me confirmation" 
// and make sure when you press ok ,it tell you you pressed ok and same for cancel*/
dataSet6.forEach(entry => {
        test('TC#6 - Handle Native Dialogues', async t => { 
                //"setTestSpeed" is used for debugging purposes only
                //await t.setTestSpeed(0.7);
                //  helperFunctions.checkSubmitEnabled();

                /*=>We must define a setNativeDialogHandler in order to be able to handle actions that results in native dialogues
                1) A native confirm dialog was invoked on page "https://only-testing-blog.blogspot.com/2014/01/textbox.html"
                , but no handler was set for it. Use the "setNativeDialogHandler" function to introduce a handler function
                 for native dialogs.
                */
                //As we are dealing with confirm dialogue, we set the setNativeDialogHandler to "true" to handle the "OK" button
                const x = true;
                await t.setNativeDialogHandler(() => true)
                await t.click(tPage.confirmBtn);
                await t.expect(tPage.confirmMessage.innerText).eql(entry.message1)
                        .takeElementScreenshot(tPage.confirmMessage);

                //Failed trial, we got (not defined) when passing the bolean value(true/false) as inout from json
                /*const status = expect(`entry.state`).eql(true);
                //const displayedMessage = await t.entry.message;
                await t.setNativeDialogHandler(() => status)
                console.log(status)
                await t.click(tPage.confirmBtn);
                await t.expect(tPage.confirmMessage.innerText).eql(entry.message)
                .takeElementScreenshot(tPage.confirmMessage);
                */

                //As we are dealing with confirm dialogue, we set the setNativeDialogHandler to "false" to handle the "Cancel" button
                await t.setNativeDialogHandler(() => false)
                await t.click(tPage.confirmBtn);
                await t.expect(tPage.confirmMessage.innerText).eql(entry.message2)
                        .takeElementScreenshot(tPage.confirmMessage);


        });
});


//7)add country spain and italy to the other list and make sure they got added and removed from left list
dataSet7.forEach(data => {
        test.only('TC#7 - Countries List', async t => {
                //"setTestSpeed" is used for debugging purposes only
                //await t.setTestSpeed(0.7);
                //  helperFunctions.checkSubmitEnabled();
                await tPage.SelectCountry(data.country1,data.country2)
                // await t
                //         .click(tPage.countryOption.withText(data.country1))
                //         .click(tPage.moveCountryBtn)
                //         .click(tPage.countryOption.withText(data.country2))
                //         .click(tPage.moveCountryBtn)
                //         .takeElementScreenshot(tPage.countryList)
                //         .takeElementScreenshot(tPage.countryList2);

                // await t.expect(tPage.countryList2.innerText).contains(data.country1) &&
                //         expect(tPage.countryList2.innerText).contains(data.country2);
                // await t.expect(tPage.countryList.innerText).notContains(data.country1) &&
                //         expect(tPage.countryList.innerText).notContains(data.country2)
        });

});

