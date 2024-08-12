import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisInfoComponent } from './synopsis-info.component';

describe('SynopsisInfoComponent', () => {
  let component: SynopsisInfoComponent;
  let fixture: ComponentFixture<SynopsisInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
