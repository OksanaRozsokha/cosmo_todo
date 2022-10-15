import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../../../../domain/servicies/auth-service/auth.service';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj<AuthService>('mackAuthService', ['signOut', 'getSignInUser$']);
  let mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('mockRouter', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isUserMenuVisible shoud be true on avatar button click and menu element is rendered', () => {
    const avatarBtn = fixture.debugElement.query(By.css('[data-button-test]'));
    avatarBtn.nativeElement.click();
    fixture.detectChanges();
    const menuEl = fixture.debugElement.query(By.css('[data-menu-test]'));

    expect(component.isUserMenuVisible).toBeTrue();
    expect(menuEl.nativeElement).toBeTruthy();
  })

  it('isUserMenuVisible shoud be true on avatar image click and menu element is rendered', () => {
    const avatarBtn = fixture.debugElement.query(By.css('[data-button-test]'));
    avatarBtn.children[0].nativeElement.click();
    fixture.detectChanges();
    const menuEl = fixture.debugElement.query(By.css('[data-menu-test]'));

    expect(component.isUserMenuVisible).toBeTrue();
    expect(menuEl.nativeElement).toBeTruthy();
  })

  it('isUserMenuVisible shoud be false on any element (different from avatar image) click and menu element is hidden', () => {
    const avatarBtn = fixture.debugElement.query(By.css('[data-element-test]'));
    avatarBtn.children[0].nativeElement.click();
    fixture.detectChanges();
    const menuEl = fixture.debugElement.query(By.css('[data-menu-test]'));

    expect(component.isUserMenuVisible).toBeFalse();
    expect(menuEl).toBeNull();
  })

  it('signOut shoud be called on sisn out button click', () => {
    mockAuthService.signOut.and.returnValue(Promise.resolve());

    const avatarBtn = fixture.debugElement.query(By.css('[data-button-test]'));
    avatarBtn.children[0].nativeElement.click();
    fixture.detectChanges();
    const signOutBtn = fixture.debugElement.query(By.css('[data-sign-out-button-test]'))
    signOutBtn.nativeElement.click();

    expect(mockAuthService.signOut).toHaveBeenCalledTimes(1);
  })
});
