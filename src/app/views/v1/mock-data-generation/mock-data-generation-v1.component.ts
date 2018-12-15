import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';


@Component({
  selector: 'app-mock-data-generation',
  templateUrl: './mock-data-generation-v1.component.html',
  styleUrls: ['./mock-data-generation-v1.component.scss']
})
export class MockDataGenerationV1Component implements OnInit
{

  submitted = false;
  model = {};

  _supportedFileTypes = [ 'json', 'xml' ]

  results = [];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService,
              private datePipe: DatePipe)
  {
    // nothing need here...
  }


  onSubmit()
  {
    this.submitted = true;

    const generator = this.generator; // to make references less verbose...

    const personAge = generator.personData.age();

    this.results.push({
      name: generator.personData.fullName(),
      age: personAge.years,
      birthday: this.datePipe.transform(personAge.birthday, 'yyyy-MM-dd'),
      address: generator.locationData.address(),
      state: generator.locationData.state(),
      zip: generator.locationData.zipPlusFour(),
    });
  }


  ngOnInit() {}

}
