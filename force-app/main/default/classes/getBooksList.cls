public with sharing class getBooksList {
    @AuraEnabled(cacheable=false)   
    public static list<Book__c> getBooks(string getvalue,string textvalue) {
        System.debug('But value'+getvalue);
        System.debug('txt value'+textvalue);
        string testvalue='%'+textvalue+'%';
        if(getvalue == 'Id'){
           return [select b.Id,b.Book_Name__c,(select Returned_On__c, Book_Status__c FROM Borrow__r ) from Book__c b where Id =: textvalue];
         //return [FIND {"textvalue"} IN ALL FIELDS RETURNING Book__c(Id,Book_Name__c,Book_Status__c,Return_Date__c)];

        }
       if(getvalue == 'Author'){
             return [select b.Id,b.Book_Name__c,(select Returned_On__c, Book_Status__c FROM Borrow__r ) from Book__c b where b.Author__r.Name like : testvalue];
         }
         if(getvalue == 'Category'){
             return [select b.Id,b.Book_Name__c,(select Returned_On__c, Book_Status__c FROM Borrow__r ) from Book__c b  where b.Category__c like : testvalue];
         }
         if(getvalue == 'Name'){
             return [select b.Id,b.Book_Name__c,(select Returned_On__c, Book_Status__c FROM Borrow__r ) from Book__c b  where b.Book_Name__c like : testvalue];
         }
        return new list<Book__c>();

    }
    @AuraEnabled(cacheable=true) 
    public static list<Book__c> getReturnedBooks(){
        // list<Book__c> b=[select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Book_Status__c !=: 'Available'];
        // system.debug('Returned Books--->'+b); 
        // return b;
        return new list<Book__c>();
    }
    @AuraEnabled(cacheable=true) 
    public static list<Book__c> getBorrowedBooks(){
        //return [select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Book_Status__c =: 'Available'];
        return new list<Book__c>();
    }
}