import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyscoresComponent } from './myscores.component';

describe('MyscoresComponent', () => {
  let component: MyscoresComponent;
  let fixture: ComponentFixture<MyscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyscoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
