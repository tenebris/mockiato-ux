import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../modal-service/modal.service';
import {FormControl, FormGroup} from '@angular/forms';


const STRUCTURE_STORAGE_PREFIX = 'mock-data.structure.';
const STRUCTURE_STORAGE_KEY_LAST = 'last';


class SavedStructure
{ // TODO: move out of component into service...

  /** determines the names of any saved structures in localStorage */
  static readNames(): string[]
  { // TODO: move out of component into service...
    const found = [];

    for (const key in localStorage)
    {
      if (!key.startsWith(STRUCTURE_STORAGE_PREFIX)) continue;
      const name = key.slice(STRUCTURE_STORAGE_PREFIX.length);
      found.push(name);
    }

    return found.sort((a, b) => {
      if (a < b) return -1;
      else if (a === b) return 0;
      else return 1;
    });
  }


  /** reads the last used structure from local storage */
  static readLast(): any
  {
    return SavedStructure.read(STRUCTURE_STORAGE_KEY_LAST);
  }


  /** reads the named structure from local Storage */
  static read(name: string): any
  { // TODO: move out of component into service...
    const lastSaved = localStorage.getItem(STRUCTURE_STORAGE_PREFIX + name);
    return lastSaved ? JSON.parse(lastSaved) : {};
  }


  /** writes the given structure to localStorage under the specified name */
  static write(name: string, data: any): any
  { // TODO: move out of component into service...
    localStorage.setItem(STRUCTURE_STORAGE_PREFIX + name, JSON.stringify(data));
  }

}


@Component({
  selector: 'app-mock-data-load-saved-form',
  templateUrl: './load-saved-structure.component.html',
  styleUrls: ['./load-saved-structure.component.scss']
})
export class LoadSavedStructureComponent implements OnInit
{
  @Input() structure: any;
  @Input() form: FormGroup;

  myFormGroup: FormGroup;

  readonly _modal_id = STRUCTURE_STORAGE_PREFIX + 'modal';

  /** initialized with list of structures saved in local storage */
  namedStructures: string[];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private modalService: ModalService) {}


  showLoadSavedModal(): void { this.modalService.open(this._modal_id); }


  ngOnInit(): void
  {
    if (!this.structure) this.structure = SavedStructure.readLast();
    this.namedStructures = SavedStructure.readNames();

    this.myFormGroup = new FormGroup({
      savedStructureName: new FormControl('')
    });

    this.form.addControl('LoadSavedStructureComponent', this.myFormGroup);

    this.myFormGroup.get('savedStructureName').setValue('simple');
  }

}
