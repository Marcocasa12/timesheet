import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  public formgroup: FormGroup;
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() colsOption: any;

  constructor(public fb: FormBuilder,
    public router:Router) {}

  ngOnInit() {
    this.formgroup = this.fb.group({
      filter: [""]
    });
  }
  conferma() {
    this.onFilter.emit(this.formgroup.value);
    this.router.navigate(['/dipendenti']);

  }
}
