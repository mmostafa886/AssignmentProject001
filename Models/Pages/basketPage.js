import { t, Selector } from 'testcafe'


class basketPage{
    constructor(){
        this.firstBasketRow = Selector('tr[class="cart_item"]').nth(0);
        
    }

    async getBookPrice_Basket()
{
    this.basketBookPrice = await this.firstBasketRow.child(3);
    console.log(this.basketBookPrice.innerText);
}
}
export default basketPage;