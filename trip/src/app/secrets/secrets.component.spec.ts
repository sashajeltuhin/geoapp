/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecretsComponent } from './secrets.component';

describe('SecretsComponent', () => {
  let component: SecretsComponent;
  let fixture: ComponentFixture<SecretsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
