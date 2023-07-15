import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleSudokuComponent } from './grille-sudoku.component';

describe('GrilleSudokuComponent', () => {
  let component: GrilleSudokuComponent;
  let fixture: ComponentFixture<GrilleSudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleSudokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleSudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
