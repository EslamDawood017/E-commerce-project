import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForUserComponent } from './register-for-user.component';

describe('RegisterForUserComponent', () => {
  let component: RegisterForUserComponent;
  let fixture: ComponentFixture<RegisterForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
