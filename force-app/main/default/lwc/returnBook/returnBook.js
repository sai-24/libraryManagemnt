import { LightningElement, wire } from 'lwc';
import getReturnedBooks from '@salesforce/apex/getBooksList.getReturnedBooks';
import UpdateReturnBook from '@salesforce/apex/getBooksList.UpdateReturnBook';
import { refreshApex } from '@salesforce/apex';
const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Returned_Date__c', type: 'date' }

];
export default class ReturnBook extends LightningElement {
    columns = columns;
    reslist=[];
@wire(getReturnedBooks)
returnbooks;
getSelectedRow(event){
    const selectedRows = event.detail.selectedRows;          
    for (let i = 0; i < selectedRows.length; i++){
        this.reslist.push(selectedRows[i].Id); 
        console.log("You selected: " +  this.reslist);
    }
}
handlereturnClick(){
    UpdateReturnBook({
        ids:this.reslist
    }).then(result=>{
         refreshApex(this.returnbooks);
    })

}

}