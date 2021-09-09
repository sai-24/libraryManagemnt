import { LightningElement, wire } from 'lwc';
import getBorrowedBooks from '@salesforce/apex/getBooksList.getBorrowedBooks';
const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Return_Date__c', type: 'date' }

];
export default class BorrowBook extends LightningElement {
    columns = columns;
@wire(getBorrowedBooks)
borrowedbooks;
}