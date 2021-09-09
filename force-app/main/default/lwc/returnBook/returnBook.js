import { LightningElement, wire } from 'lwc';
import getReturnedBooks from '@salesforce/apex/getBooksList.getReturnedBooks';

const columns = [
{ label: 'id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Return_Date__c', type: 'date' }

];
export default class ReturnBook extends LightningElement {
    columns = columns;
@wire(getReturnedBooks)returnbooks;

}