import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  itens: [];

  constructor(
    private bottomSheet: MatBottomSheetRef<SheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.itens = data;
  }

  ngOnInit() {}

  onSelectOption(callback: string) {
    this.bottomSheet.dismiss(callback)
  }

}
