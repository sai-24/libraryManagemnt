import { LightningElement } from 'lwc';
import getBooks from '@salesforce/apex/getBooksList.getBooks';

const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Borrow__r[0].Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Borrow__r[0].Returned_On__c', type: 'date' }

];
export default class SearchBooks extends LightningElement {
butvalue;
txtvalue;
columns=columns;
books;
handleClick(event){
    const buttonvalue=event.target.label;
    this.butvalue=buttonvalue;
    
console.log('value---',buttonvalue);
}
handlesearchClick(){
const txtbook= this.template.querySelector(".txttext").value;
console.log('text value----',txtbook);
this.txtvalue=txtbook;
this.bookslist();
}
bookslist(){
    console.log('Start');
    getBooks({        
        getvalue:this.butvalue,
        textvalue:this.txtvalue
        }).then(result=>{
            //refreshApex();
            this.books=result;
        console.log(result);
        }
        
        );
}


}