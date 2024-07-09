import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomedeferPage } from './homedefer.page';

describe('HomedeferPage', () => {
  let component: HomedeferPage;
  let fixture: ComponentFixture<HomedeferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedeferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
