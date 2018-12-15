import {Component, OnInit} from '@angular/core';
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
  results = [];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService) {}


  onSubmit()
  {
    this.submitted = true;

    const generator = this.generator; // to make references less verbose...

    this.results.push({
      name: generator.personData.fullName(),
      birthday: generator.personData.birthday()
      // address: generator.address(),
      // state: generator.state(),
      // zip: generator.zipCode(),
    });
  }


  ngOnInit() {}

}
