import { t, Selector } from 'testcafe'

import homePage from '../Models2/Pages/homePage';
import cartPage from '../Models2/Pages/cartPage';

const hPage = new homePage();
const cPage = new cartPage();



fixture.disablePageCaching`Task3`.page`https://demostore.x-cart.com/`;

//1)you need to add three different books (from your choice) to shopping cart
test.only("TC#1:Add 3 items to the shopping cart", async t => {
    const stPrice = await hPage.SelectProduct(0);
    const ndPrice = await hPage.SelectProduct(1);
    const rdPrice = await hPage.SelectProduct(2);

    //2)Go to shopping cart ,make sure the 3 products got added to the table with correct product price
    await hPage.openYourCart();

    const stCartItemPrice = await cPage.getItemCartPrice(0);
    const ndCartItemPrice = await cPage.getItemCartPrice(1);
    const rdCartItemPrice = await cPage.getItemCartPrice(2);

    await t.expect(stPrice).eql(stCartItemPrice);
    //console.log(stPrice+'/'+stCartItemPrice)
    await t.expect(ndPrice).eql(ndCartItemPrice);
    //console.log(ndPrice+'/'+ndCartItemPrice)
    await t.expect(rdPrice).eql(rdCartItemPrice);
    //console.log(rdPrice+'/'+rdCartItemPrice)

    //3)Make sure the Subtotal and Total are correct
    const fristSUM = await cPage.sumOfPrices();
    const firstSUMCurrency = await cPage.amountWithCurrency(await fristSUM);
    //console.log(firstSUMCurrency)
    await t.expect(await firstSUMCurrency).eql(await cPage.subTotal.innerText)
    const totalDiscount = await cPage.calculateDiscount(fristSUM);
    //console.log(await cPage.totalPricCalc(fristSUM,totalDiscount));
    await t.expect(await cPage.totalPricCalc(await fristSUM, await totalDiscount)).eql(await cPage.getPriceNumberValue(cPage.totalPriceWithDiscount));
    //console.log(await cPage.getShippingCost(await cPage.shippingCost));

    //4)Remove 1 product from cart ,make sure that there is only 2 products in table with correct name and price
    await cPage.removeFromCart(0);

    //5)make sure subtotal and total values are now correct
    const secondSUM = await cPage.sumOfPrices();
    const secondSUMCurrency = await cPage.amountWithCurrency(await secondSUM);
    // console.log(secondSUMCurrency)
    await t.expect(await secondSUMCurrency).eql(await cPage.subTotal.innerText)
    const totalDiscount_Removal = await cPage.calculateDiscount(secondSUM);
    await t.expect(await cPage.totalPricCalc(await secondSUM, await totalDiscount_Removal)).eql(await cPage.getPriceNumberValue(cPage.totalPriceWithDiscount));



});

//
test("TC#2: Remove Item", async t => {


});
