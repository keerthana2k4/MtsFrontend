export interface Transactionlog {
    id : string;
    fromAccountId : number;
    toAccountId : number;
    amount : number;
    status : string;
    failureReason : string;
    createdOn : Date;
    idempotencyKey : string;
}
