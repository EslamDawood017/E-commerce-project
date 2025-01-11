import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderStatusComponentComponent } from './update-order-status-component.component';

describe('UpdateOrderStatusComponentComponent', () => {
  let component: UpdateOrderStatusComponentComponent;
  let fixture: ComponentFixture<UpdateOrderStatusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrderStatusComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
