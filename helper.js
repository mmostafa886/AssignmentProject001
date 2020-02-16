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
}
export default helper001;