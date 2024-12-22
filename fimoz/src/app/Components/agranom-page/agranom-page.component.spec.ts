import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgranomPageComponent } from './agranom-page.component';

describe('AgranomPageComponent', () => {
  let component: AgranomPageComponent;
  let fixture: ComponentFixture<AgranomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgranomPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgranomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
