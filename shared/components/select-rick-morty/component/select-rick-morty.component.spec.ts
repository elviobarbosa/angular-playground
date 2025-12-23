import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SelectRickMortyComponent } from "./select-rick-morty.component";

describe("SelectRickMortyComponent", () => {
  let component: SelectRickMortyComponent;
  let fixture: ComponentFixture<SelectRickMortyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRickMortyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectRickMortyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
