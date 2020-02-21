import { t, Selector, ClientFunction } from 'testcafe'


class menuBar{
    constructor(){
        //Locators
       this.shopMenuItem = Selector("#menu-item-40");
       this.shopPageLabel = Selector('nav[class="woocommerce-breadcrumb"]');
       this.basketLink = Selector('#wpmenucartli');
       this.updateCart = Selector('input[name="update_cart"]');

    }

    async openShopPage()
    {
        await t
                .click(this.shopMenuItem)
                .expect(this.shopPageLabel.innerText).contains('Shop');
    }

    async openBasketPage()
    {
        await t
                .click(this.basketLink)
                .expect(this.updateCart.exists).ok({ timeout: 5000 });


    }



}

export default menuBar;