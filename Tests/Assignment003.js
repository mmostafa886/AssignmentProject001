import { t,Selector } from 'testcafe'
import { ClientFunction } from 'testcafe';
import homePage from '../Models/Pages/homePage';
import menuBar from '../Models/Components/menuBar';
import shopPage from '../Models/Pages/shopPage';
import basketPage from '../Models/Pages/basketPage';
import helper001 from '../helper';
const helperFunctions = new helper001();


//const hPage = new homePage();
const mBar = new menuBar();
const sPage = new shopPage();
const bPage = new basketPage();
//=============================================

fixture`Assignments002`
  .page`http://practice.automationtesting.in/`

  //1)you need to add three different books (from your choice) to shopping cart
  test('TC#1-Add 3 Books to the Shopping Cart', async t => {
    //await t.setTestSpeed(0.5);
    await mBar.openShopPage();
    await sPage.addBookToBasket();
  
  });

  //2)Go to shopping cart ,make sure the 3 products got added to the table with correct product price
  test.only('TC#2-Check the ShoppingCart Items', async t => {
    //await t.setTestSpeed(0.5);
    await mBar.openShopPage();
    await sPage.addBookToBasket();
    const fbPrice = await sPage.getBookPrice(sPage.firstBook);
     //console.log(fbPrice)

    //  const sbPrice = await sPage.getBookPrice(sPage.secondBook);
    //  //console.log(sbPrice)

    //  const tbPrice = await sPage.getBookPrice(sPage.thirdBook);
    // // console.log(tbPrice)

    await mBar.openBasketPage();
    const cURL =await helperFunctions.getCurrentURL();
    await t.expect(cURL).contains('basket');

    await bPage.getBookPrice_Basket();

   });


   test('TC', async t => {

   }
   )
 
