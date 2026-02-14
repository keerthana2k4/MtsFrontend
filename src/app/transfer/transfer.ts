import { ChangeDetectorRef, Component } from '@angular/core';
import { Transferrequest } from '../transferrequest';
import { Transferservice } from '../transferservice';
import { Transferresponse } from '../transferresponse';
import { ErrorResponse } from '../error-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.html',
  styleUrls: ['./transfer.css'],
})
export class Transfer {
  isSuccess: any = null;
  statusMessage: any = null;
  showBackButton: boolean = false;

  // Optional cap to match your previous patterns
  readonly MAX_AMOUNT = 100000;

  transferreq: Transferrequest = {
    fromId: 0,
    toId: 0,
    amount: 0,
  };

  transferresp: Transferresponse = {
    transactionId: '',
    status: '',
    message: '',
    debitedFrom: 0,
    creditedTo: 0,
    amount: 0,
  };

  errorresp: ErrorResponse = {
    errorCode: '',
    message: '',
  };

  constructor(
    private service: Transferservice,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.showBackButton = true;
    this.route.paramMap.subscribe((param) => {
      this.transferreq.fromId = Number(param.get('id'));
      this.cd.detectChanges();
    });
  }

  // ---------- Simple validators (template-driven friendly) ----------
  private isInteger(value: any): boolean {
    return /^-?\d+$/.test(String(value).trim());
  }

  private isValidAmount(value: any): boolean {
    // number with up to 2 decimals, positive
    return /^\d+(\.\d{1,2})?$/.test(String(value).trim()) && Number(value) > 0;
  }

  private validate(): boolean {
    // Basic required checks
    if (this.transferreq.toId === null || this.transferreq.toId === undefined || String(this.transferreq.toId).trim() === '') {
      this.isSuccess = false;
      this.statusMessage = 'Please enter the recipient account id.';
      return false;
    }
    if (this.transferreq.amount === null || this.transferreq.amount === undefined || String(this.transferreq.amount).trim() === '') {
      this.isSuccess = false;
      this.statusMessage = 'Please enter the amount.';
      return false;
    }

    // Type/format checks
    if (!this.isInteger(this.transferreq.toId) || Number(this.transferreq.toId) < 1) {
      this.isSuccess = false;
      this.statusMessage = 'Account id must be a valid integer and at least 1.';
      return false;
    }

    if (!this.isValidAmount(this.transferreq.amount)) {
      this.isSuccess = false;
      this.statusMessage = 'Amount must be a positive number with up to 2 decimal places.';
      return false;
    }

    const numAmount = Number(this.transferreq.amount);
    if (numAmount > this.MAX_AMOUNT) {
      this.isSuccess = false;
      this.statusMessage = `Amount exceeds the maximum allowed (${this.MAX_AMOUNT}).`;
      return false;
    }

    // Cross-field: cannot transfer to same account
    if (Number(this.transferreq.fromId) === Number(this.transferreq.toId)) {
      this.isSuccess = false;
      this.statusMessage = 'You cannot transfer to the same account.';
      return false;
    }

    // All good
    return true;
  }
  // -----------------------------------------------------------------

  transferMoney() {
    // Keep your flow, just guard invalid input first
    if (!this.validate()) {
      this.cd.detectChanges();
      return;
    }

    this.service.transferMoney(this.transferreq).subscribe({
      next: (resp: Transferresponse | ErrorResponse) => {
        if (resp && 'transactionId' in resp) {
          console.log(resp);
          this.transferresp = resp as Transferresponse;
          this.isSuccess = true;
          this.statusMessage = 'Transfer successful!';
          this.cd.detectChanges();
        } else {
          // In case backend returns error-like body on 200
          const err = resp as ErrorResponse;
          this.isSuccess = false;
          this.statusMessage = 'Transaction Failed! ' + (err?.message ?? '');
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.log(err);
        this.errorresp = err?.error ?? { errorCode: '', message: 'Unknown error' };
        this.isSuccess = false;
        this.statusMessage = 'Transaction Failed! ' + (this.errorresp?.message ?? '');
        this.cd.detectChanges();
      },
    });
  }

  navigate(): void {
    this.router.navigate(['/home']);
  }
}