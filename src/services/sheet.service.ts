import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SheetComponent } from 'src/app/components/sheet/sheet.component';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private bottomSheet: MatBottomSheet) { }

  public open(options?: any) {
    return this.bottomSheet.open(SheetComponent, { data: options })
  }


}
