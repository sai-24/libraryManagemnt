import { LightningElement } from 'lwc';
import getBooks from '@salesforce/apex/getBooksList.getBooks';
import UpdateBook from '@salesforce/apex/getBooksList.UpdateBook';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Returned_Date__c', type: 'date' }
];
export default class SearchBooks extends LightningElement {
butvalue;
txtvalue;
columns=columns;
books;
Getselectedrows;
reslist=[];
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
getSelectedRow(event){
    const selectedRows = event.detail.selectedRows;
    this.Getselectedrows=selectedRows;
    console.log(selectedRows);
    
    for (let i = 0; i < selectedRows.length; i++){
        this.reslist.push(selectedRows[i].Id); 
        console.log("You selected: " +  this.reslist);
    }

}
handleborrowClick(event){
    UpdateBook({
        ids:this.reslist
    }).then(result=>{
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Book Borrowed Sucessfully',
            variant: 'success',
            mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        this.bookslist();
        console.log(result);
    })

    
}


}