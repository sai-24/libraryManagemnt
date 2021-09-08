import { LightningElement } from 'lwc';
import getBooks from '@salesforce/apex/getBooksList.getBooks';
import { refreshApex } from '@salesforce/apex';
const columns = [
{ label: 'id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Return_Date__c', type: 'date' }

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
refreshContact(){
    refreshApex(this.bookslist);

    
  }

}