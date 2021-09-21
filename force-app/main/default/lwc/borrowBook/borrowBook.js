import { LightningElement, wire } from 'lwc';
import getBorrowedBooks from '@salesforce/apex/getBooksList.getBorrowedBooks';
const columns = [
{ label: 'Id', fieldName: 'Id' },
{ label: 'Book Name', fieldName: 'Book__r.Book_Name__c', type: 'text' },
{ label: 'Book status', fieldName: 'Book_Status__c', type: 'text' },
{ label: 'Return Date', fieldName: 'Returned_On__c', type: 'date' }

];
export default class BorrowBook extends LightningElement {
    columns = columns;
@wire(getBorrowedBooks)
borrowedbooks;
}