# mock-data-generator/form

The ```mock-data-form.component``` is the root component 
which should be included into any view in order to display
a form which will generate a structure which can then be 
passed into the ```MockDataGeneratorService``` to generate 
a series of objects matching that structure.

> Note: This component should be the only on referenced
by the external views.  It will decide which versions
of the sub-components to use. 
