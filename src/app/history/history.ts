import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transactionlog } from '../transactionlog';
import { ActivatedRoute, Router } from '@angular/router';
import { Transferservice } from '../transferservice';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.css',
})

export class History implements OnInit{

  transactions: Transactionlog[] = [];
  currentAccountId: number = 0;

  displayedColumns: string[] = ['date', 'type', 'account', 'amount', 'status'];

  constructor(
    private transferservice: Transferservice,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
        var id = Number(param.get('id'));
        this.currentAccountId = id;
      })
    this.loadTransactions();
    this.cd.detectChanges();
  }

  loadTransactions(): void {
    this.transferservice.getTransactions(this.currentAccountId).subscribe({
      next: (transactions) => {
        this.transactions = transactions.sort((a, b) => {
          return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        });
        this.cd.detectChanges();
      }
    });
  }

  getTransactionType(transaction: Transactionlog): string {
    return transaction.fromAccountId === this.currentAccountId ? 'SENT' : 'RECEIVED';
  }

  getOtherAccountId(transaction: Transactionlog): number {
    return transaction.fromAccountId === this.currentAccountId
      ? transaction.toAccountId
      : transaction.fromAccountId;
  }

  getFormattedAmount(transaction: Transactionlog): string {
    const amount = transaction.amount;
    const isSent = transaction.fromAccountId === this.currentAccountId;
    return isSent ? `₹${amount}` : `₹${amount}`;
  }
  getAmountClass(transaction: Transactionlog): string {
    return transaction.fromAccountId === this.currentAccountId ? 'debit' : 'credit';
  }

  formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

  goBack(): void {
    this.router.navigate(['/home']);
  }

}