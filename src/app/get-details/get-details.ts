import { ChangeDetectorRef, Component } from '@angular/core';
import { Account } from '../account';
import { Accountservice } from '../accountservice';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ErrorResponse } from '../error-response';
import { AccountResponse } from '../accountresponse';


@Component({
  selector: 'app-get-details',
  standalone: false,
  templateUrl: './get-details.html',
  styleUrl: './get-details.css',
})

export class GetDetails {

  details: Account | undefined;
  showBackButton: boolean = false;

  accountresp : AccountResponse = {
    id: 0,
    holderName: "",
    balance: 0,
    status: "",
    version: 0,
    lastUpdated: new Date()
  }
  
constructor(
  private service: Accountservice,
  private route: ActivatedRoute,
  private router: Router,
  private cd: ChangeDetectorRef,
) {}

ngOnInit(): void {
  this.showBackButton = true;
  this.route.paramMap.subscribe((param) => {
    const id = Number(param.get('id'));
    this.getUserDetails(id);
  });
}

getUserDetails(id:number):void{

    this.service.getDetails(id).subscribe({
      next: (resp: AccountResponse | ErrorResponse) => {
        if ('id' in resp)
          this.accountresp = resp;        
        this.cd.detectChanges();
      }
      });
  }

  navigate():void{
    this.router.navigate(['/home']); 
  }
  }

