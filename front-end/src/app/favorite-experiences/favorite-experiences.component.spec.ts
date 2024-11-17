import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteExperiencesComponent } from './favorite-experiences.component';

describe('FavoriteExperiencesComponent', () => {
  let component: FavoriteExperiencesComponent;
  let fixture: ComponentFixture<FavoriteExperiencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteExperiencesComponent]
    });
    fixture = TestBed.createComponent(FavoriteExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
