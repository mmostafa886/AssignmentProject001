require('dotenv').config()
import { t, Selector, ClientFunction } from 'testcafe'


class helper001 {
   constructor() {
   }

 async  selectCheckBox(radio1,radio2)
{
    await t
    .click(radio1)
    .expect(radio1.checked).ok()
    .expect(radio2.checked).notOk()
    .takeElementScreenshot(radio1)
    .takeElementScreenshot(radio2)
}
 ///////////////////////////////////////////////////////////////////

 async  getCurrentURL()
 {
  await t
  const getURL = ClientFunction(() => document.location.href);
 const url = await getURL();
  //console.log(url);
  return url;
 }
}
export default helper001;