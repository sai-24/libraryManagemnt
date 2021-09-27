import { LightningElement, wire,track } from 'lwc';
import getReturnedBooks from '@salesforce/apex/getBooksList.getReturnedBooks';
import UpdateReturnBook from '@salesforce/apex/getBooksList.UpdateReturnBook';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Returned_Date__c', type: 'date' }

];
export default class ReturnBook extends LightningElement {
    columns = columns;
    reslist=[];
    returnbooks;
    error;
   @track wiredReturnList=[];

@wire(getReturnedBooks) returnHandler(result) {
    this.wiredReturnList = result;    
    if (result.data) {
     
      this.returnbooks = result.data;          
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      
    }
}
// connectedCallback(){
//     this.returnbookslist();
// }
// returnbookslist(){
//     console.log('Start');
//     getReturnedBooks().then(result=>{            
//             this.returnbooks=result;
//         console.log(result);
//         }
//         );
// }
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
       
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Books Returned Sucessfully',
            variant: 'success',
            mode: 'dismissable'
            });
            this.dispatchEvent(evt);
            //this.returnbookslist();
            refreshApex(this.wiredReturnList);
    })

}

}