public with sharing class getBooksList {
@AuraEnabled(cacheable=false)   
public static list<Book__c> getBooks(string getvalue,string textvalue) {
    System.debug('But value'+getvalue);
    System.debug('txt value'+textvalue);
    string testvalue='%'+textvalue+'%';
    if(getvalue == 'Id'){
        return [select b.Id,b.Book_Name__c,b.Book_Status__c,b.Expected_Returned_Date__c from Book__c b where Id =: textvalue];
        //return [FIND {"textvalue"} IN ALL FIELDS RETURNING Book__c(Id,Book_Name__c,Book_Status__c,Return_Date__c)];

    }
    if(getvalue == 'Author'){
            return [select b.Id,b.Book_Name__c,b.Book_Status__c,b.Expected_Returned_Date__c from Book__c b where b.Author__c like : testvalue];
        }
        if(getvalue == 'Category'){
            return [select b.Id,b.Book_Name__c,b.Book_Status__c,b.Expected_Returned_Date__c from Book__c b  where b.Category__c like : testvalue];
        }
        if(getvalue == 'Name'){
            return [select b.Id,b.Book_Name__c,b.Book_Status__c,b.Expected_Returned_Date__c from Book__c b where b.Book_Name__c like : testvalue];
        }
    return new list<Book__c>();

}
@AuraEnabled(cacheable=true) 
public static list<Book__c> getReturnedBooks(){
    // list<Book__c> b=[select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Book_Status__c !=: 'Available'];
    // system.debug('Returned Books--->'+b); 
    // return b;
    return [select Id,Book_Name__c,Book_Status__c,Returned_Date__c from Book__c where Book_Status__c !=: 'Available'];
}
@AuraEnabled(cacheable=true) 
public static list<Book__c> getBorrowedBooks(){
    //return [select Id,Returned_On__c, Book_Status__c,Book__r.Book_Name__c FROM Borrow__c];
    return new list<Book__c>();
}
@AuraEnabled
public static void UpdateBook(list<Id> ids){
    system.debug('The ID are-->'+ids);
    list<Book__c> resbooks=[select id,Borrowed_Date__c,Book_Status__c,Author__c from Book__c where Id in : ids];
    system.debug('The books are-->'+resbooks);
    if (!resbooks.isEmpty())
        {
            for(Book__c b :resbooks){
        system.debug('Update Start-->');
       
        b.Borrowed_Date__c=System.today();
        b.Book_Status__c='BORROWED';    
        update b;
            }
        }
            
}
@AuraEnabled
public static void UpdateReturnBook(list<Id> ids){
    system.debug('The ID are-->'+ids);
    list<Book__c> resbooks=[select id,Borrowed_Date__c,Book_Status__c,Author__c,Returned_Date__c from Book__c where Id in : ids];
    system.debug('The books are-->'+resbooks);
    if (!resbooks.isEmpty())
        {
        for(Book__c b :resbooks){               
        b.Returned_Date__c=System.today();
        b.Book_Status__c='AVAILABLE';
            
        update b;
            }
        }
            
}
}