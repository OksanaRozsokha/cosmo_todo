import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPage } from './sign-in.component';
import { AuthService } from '../../../domain/servicies/auth-service/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;
  let mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj<AuthService>('mockAuthService', ['signInWithGoogle'])
  let mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('mockRouter', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInPage ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call signInWithGoogle on button click', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('[data-btn-test]'));
    mockAuthService.signInWithGoogle.and.returnValue(Promise.resolve());
    button.nativeElement.click();
    expect(mockAuthService.signInWithGoogle).toHaveBeenCalledTimes(1);
  });
});
