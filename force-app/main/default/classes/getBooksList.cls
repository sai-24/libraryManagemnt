public with sharing class getBooksList {
    @AuraEnabled(cacheable=true)
    
    public static list<Book__c> getBooks(string getvalue,string textvalue) {
        System.debug('But value'+getvalue);
        System.debug('txt value'+textvalue);
        if(getvalue == 'Id'){
            return [select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Id like : textvalue];
        }
        if(getvalue == 'Author'){
            return [select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Author__c like : textvalue];
        }
        if(getvalue == 'Category'){
            return [select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Category__c like : textvalue];
        }
        if(getvalue == 'Name'){
            return [select Id,Book_Name__c,Book_Status__c,Return_Date__c from Book__c where Book_Name__c like : textvalue];
        }
        return new list<Book__c>();

    }
}
