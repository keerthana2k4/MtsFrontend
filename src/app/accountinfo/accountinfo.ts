import { Component } from '@angular/core';

@Component({
  selector: 'app-accountinfo',
  standalone: false,
  templateUrl: './accountinfo.html',
  styleUrl: './accountinfo.css',
})
export class Accountinfo {

  accountId: number | null = null; 

  constructor() {}

  ngOnInit(): void {
  const storedUser = sessionStorage.getItem('auth_user');
  console.log(storedUser);
  if (storedUser) {
    this.accountId = Number(storedUser);
  }

}
}
