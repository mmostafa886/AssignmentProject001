import { t, Selector, ClientFunction } from 'testcafe'


class homePage {
    constructor() {
        this.ProductLoc = Selector('li[class="product-cell box-product"]');
        this.popUp = Selector('[class="add2cart-popup"]');
        this.popUpCloseBtn = Selector('[class="ui-dialog-titlebar-close"]');
        this.yourCartBtn = Selector('[title="Your cart"]');
        this.viewCartBtn = Selector('[class="buttons-row"]').child(0);
        this.overlay = Selector('[class="ui-widget-overlay ui-front"]');
    }

    async  SelectProduct(itemIndex) {
        /*
        Press on the ESC button at the start of the test, as if it is not the first time to use the function
        the add to cart pop-up may still opened
        */
        await t.pressKey('esc');
        //getting the product cell according to the {nth(n)} starting from index 0
        const iTemProductLoc = this.ProductLoc.nth(itemIndex);
        //Locate the "Add To Cart" button
        const addToCartBtn = iTemProductLoc.find("button");
        //Get the Item price
        const productPrice = iTemProductLoc.find('[class="product-price"]');

        const Product = await iTemProductLoc;
        const addBtn = await addToCartBtn;

        //Hover on the item in order to get the add to cart button visible
        await t.hover(Product);
        //Click on the add to cart button
        await t.click(addBtn);
        await t.expect(this.popUpCloseBtn.exists).ok();
        await t.expect(this.popUp.exists).ok();
        await t.pressKey('esc');
        await t.pressKey('esc');

        const price = await productPrice;
        //console.log(await price.textContent);
        await this.checkOverlay();
        await t.pressKey('esc');
        return await (await price.textContent).trim();
    }

    async openYourCart() {
        await this.checkOverlay();
        await t
            .click(this.yourCartBtn)
            .click(this.viewCartBtn)
    }

    async checkOverlay() {
        if (await this.overlay.exists) {
            await t.pressKey('esc');
            await t.expect(this.yourCartBtn.visible).ok();
        }
        else {
            await t.pressKey('esc');
            await t.expect(this.yourCartBtn.visible).ok();
            await t.pressKey('esc');
        }
    }
}


export default homePage;