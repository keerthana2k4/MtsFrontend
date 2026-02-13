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
 
  transferreq: Transferrequest = {
    fromId: 0,
    toId: 0,
    amount: 0,
  };
 
  transferresp : Transferresponse = {
    transactionId : "",
    status : "",
    message : "",
    debitedFrom : 0,
    creditedTo : 0,
    amount : 0
  };
 
  errorresp : ErrorResponse = {
     errorCode : "",
	   message : ""
  }
 
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
    this.cd.detectChanges()
    });
  }
  
  transferMoney() {
    this.service.transferMoney(this.transferreq).subscribe({
      next: (resp: Transferresponse | ErrorResponse) => {
        if (resp && 'transactionId' in resp) {
          console.log(resp);
          this.transferresp = resp;
          this.isSuccess = true;
          this.statusMessage = "Transfer successful!";
          this.cd.detectChanges()
        }
      },
      error: (err) => {
        console.log(err);
        this.errorresp = err.error;
        this.isSuccess = false;
        this.statusMessage = "Transaction Failed! " + this.errorresp.message;
        this.cd.detectChanges()
      }
    });
  }

  navigate(): void {
    this.router.navigate(['/home']);
  }
}