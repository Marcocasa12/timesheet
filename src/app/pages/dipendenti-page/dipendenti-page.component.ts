import { Component, OnInit } from "@angular/core";
import { DataTableOptions } from "src/app/api/datatable-options";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { Router } from "@angular/router";
import { ApiService } from "src/core/service/api.service";

@Component({
  selector: "app-dipendenti-page",
  templateUrl: "./dipendenti-page.component.html",
  styleUrls: ["./dipendenti-page.component.scss"]
})
export class DipendentiPageComponent implements OnInit {
  options: DataTableOptions = {
    colsOptions: [
      {
        label: "Name",
        name: "name"
      },
      {
        label: "Surname",
        name: "surname"
      }
    ]
  };
  public lista: any[];
  constructor(
    public dipendenteService: DipendentiService,
    public router: Router,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.dipendenteService.getAll().subscribe(res => {
      console.log("DIPENDENTI      :",res.response);
      this.lista = res.response;
    });
    this.api.get("employees").subscribe(res => {
      console.log();
    });
  }

  select(input: any[]) {
    const sogg = input[0];
    this.router.navigate(["dipendenti", sogg.id]);
  }
  onDeleteHandler(id: any) {
    this.dipendenteService.deleteById(id).subscribe(r => {
      this.dipendenteService.getAll().subscribe(res => {
        this.lista = res.response;
        

      });
    });
   
  }
  onEditHandler(id: any) {
    this.router.navigate(["dipendenti/edit", id]);
  }
  filter(res: any) {
    this.dipendenteService
      .filter(res.filter)
      .subscribe((res: any) => {
        this.lista = res.response;
      });
  }
}
