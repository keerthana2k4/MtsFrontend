import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountinfo } from './accountinfo';

describe('Accountinfo', () => {
  let component: Accountinfo;
  let fixture: ComponentFixture<Accountinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Accountinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountinfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
