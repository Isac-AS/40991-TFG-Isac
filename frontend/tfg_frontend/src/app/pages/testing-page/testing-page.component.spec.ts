/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestingPageComponent } from './testing-page.component';

describe('TestingPageComponent', () => {
  let component: TestingPageComponent;
  let fixture: ComponentFixture<TestingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
