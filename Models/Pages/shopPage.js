import { t, Selector } from 'testcafe'


class shopPage{
    constructor(){
        //Locators
        this.addToBasket = Selector('a').withText('Add to basket');
        this.firstBook = Selector('a[data-product_id="170"]');
        this.secondBook = Selector('a[data-product_id="181"]');
        this.thirdBook = Selector('a[data-product_id="182"]');
        this.cartContents = Selector('[class="cartcontents"]');
        this.fristBookPrice;
        this.secondBookPrice;
        this.thirdBookPrice;

    }

async getNumberOfAddToBasketElements()
{
    const adtNumber = await getNumberOfAddToBasketElements
    console.log(adtNumber);
}

async addBookToBasket()
{
    await t.click(this.firstBook);
    await t.expect(this.cartContents.innerText).contains('1',{ timeout: 15000 });
   // this.fristBookPrice = await this.getBookPrice(this.firstBook)

//     await t.click(this.secondBook);
//     await t.expect(this.cartContents.innerText).contains('2');
//    // this.secondBookPrice = await this.getBookPrice(this.secondBook)

//     await t.click(this.thirdBook);
//     await t.expect(this.cartContents.innerText).contains('3');
//    // this.thirdBookPrice = await this.getBookPrice(this.thirdBook)
}

async getBookPrice(book)
{
    this.bookParent =await book.parent().child(0).child(2);//returns the price with the currency label
    this.bPrice= await this.bookParent();
    //this removes the currency lable "₹" from the retrieved innertext
    console.log(this.bPrice.innerText.slice(1))
    return this.bPrice.innerText.slice(1);

}


}
export default shopPage;