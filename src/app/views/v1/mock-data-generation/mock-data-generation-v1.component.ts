import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService, MockDataStructure} from '../../../shared/services/mock-data-generator/mock-data-generator.service';


function processModel(model: {}): MockDataStructure
{
  return MockDataStructure.newMockDataStructure();

  // TODO: populate a valid structure from the model
}


@Component({
  selector: 'app-mock-data-generation',
  templateUrl: './mock-data-generation-v1.component.html',
  styleUrls: ['./mock-data-generation-v1.component.scss']
})
export class MockDataGenerationV1Component implements OnInit
{

  submitted = false;
  model = {
    name: 'mock-data',
    type: 'json',
    count: 5,
    structure: {},
  };

  _supportedFileTypes = [ 'json', 'xml' ]

  results = [];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService)
  {
    // nothing need here...
  }


  onSubmit()
  {
    this.submitted = true;
    this.results = this.generator.generate(processModel(this.model.structure), this.model.count);
  }


  ngOnInit() {}

}
