import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDetails } from './get-details';

describe('GetDetails', () => {
  let component: GetDetails;
  let fixture: ComponentFixture<GetDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
