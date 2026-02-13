import { ChangeDetectorRef, Component } from '@angular/core';
import { Accountservice } from '../accountservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-balance',
  standalone: false,
  templateUrl: './get-balance.html',
  styleUrls: ['./get-balance.css'],
})
export class GetBalance {
  balance: number = 0;
  showBackButton: boolean = false;

  constructor(
    private service: Accountservice,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.showBackButton = true;
    this.route.paramMap.subscribe((param)=>{
      var id = Number(param.get('id'));
      this.getUserBalance(id);
    })
  }

  getUserBalance(id: number): void {
    this.service.getBalance(id).subscribe({
      next: (resp: number) => {
        this.balance = resp;
        this.cd.detectChanges();
      }
    });
  }
  
  navigate(): void {
    this.router.navigate(['/home']);
  }
}