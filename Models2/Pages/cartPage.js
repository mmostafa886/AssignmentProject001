import { t, Selector, ClientFunction } from 'testcafe'


class cartPage {
    constructor() {
        this.itemRow = Selector('[class="selected-product"]');
        this.subTotal = Selector('[class="sums"]').find('[class="surcharge"]');
        this.cartRight = Selector('#cart-right');
        this.deletSuccessMsg = Selector('#status-messages')
        this.totalPriceWithDiscount = Selector('[class="total"]');
        this.shippingCost = Selector('[class="shipping-cost"]');
    }

    async getItemCartPrice(itemIndex) {
        //Get the price of an item from the shopping cart
        await t.pressKey('esc');
        const nthCartItem = await this.itemRow.nth(itemIndex);
        const cItemPrice = await nthCartItem.find('[class="surcharge"]');
        const cartItem = await nthCartItem;
        //console.log(await cItemPrice.innerText)
        return cItemPrice.innerText;

    }

    async sumOfPrices() {
        //Calculate the SUM of prices (as a number value) for all the items included in the shopping cart
        var rowsCount = await this.itemRow.count;
        var SOP = 0;
        //console.log(rowsCount);
        for (var i = 0; i < await rowsCount; i++) {
            var cItemPrice = await this.getItemCartPrice(i);
            SOP = await SOP + Number(await cItemPrice.slice(1))
        }
        // console.log(SOP);
        return SOP;
    }

    async calculateDiscount(subTotalPrice) {
        //Calculate the Discount value which equals to 10%
        const discValue = await subTotalPrice / 10
        //Round the retrieved discount value
        const discValueRound = Math.round((await discValue + Number.EPSILON) * 100) / 100
        //console.log(await discValueRound)
        //Return the rounded value with only 2 digits after the decimal point
        return discValueRound.toFixed(2);

    }
    async removeFromCart(elementIndex) {
        const rowsCount = await this.itemRow.count;
        //  console.log(await rowsCount);
        const nthCartItem = this.itemRow.nth(elementIndex);
        const deletBtn = nthCartItem.find('[class="remove next-previous-assigned"]');
        await t.click(deletBtn);
        await t.expect(this.deletSuccessMsg.visible).ok();
        await t.expect(this.cartRight.visible).ok();
        /*Page refresh in order to get the current rows count 
        (as the number of rows is not directly updated after item removal & require page reload)
        */
        await t.eval(() => location.reload(true));
        const rowsCount2 = await this.itemRow.count;
        await t.expect(rowsCount2).eql(rowsCount - 1);
    }

    async getShippingCost() {
        //using the Slice function in order to get only the part of text that equals the corrier cost
        const totalShippingCost = await (await this.shippingCost.innerText).slice(2, 7)
        return totalShippingCost;
    }

    async totalPricCalc(priceAmout, discAmount) {
        //Calculate the total price (Items Price - Discount + Corrier Cost)
        const totalAmountWithDisc = await priceAmout - await discAmount + Number(await this.getShippingCost());
        return totalAmountWithDisc;
    }

    async amountWithCurrency(totalAmount) {
        //Add the $ in order to get a text value equal to what is suppsoed to be displayed in the page
        const toBePaid = '$' + totalAmount
        return toBePaid;
    }

    async getPriceNumberValue(price) {
        //Remove the $ (With Slic) in order to get a valid number value (With Number) that can be used for calculation
        const priceNumberValue = Number((await price.textContent).trim().slice(1));
        return priceNumberValue;
    }
}

export default cartPage;