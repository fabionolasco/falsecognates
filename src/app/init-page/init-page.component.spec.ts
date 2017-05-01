/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InitPageComponent } from './init-page.component';

describe('InitPageComponent', () => {
  let component: InitPageComponent;
  let fixture: ComponentFixture<InitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
