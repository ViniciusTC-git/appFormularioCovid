import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificarEmailPage } from './verificar-email.page';

describe('VerificarEmailPage', () => {
  let component: VerificarEmailPage;
  let fixture: ComponentFixture<VerificarEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
