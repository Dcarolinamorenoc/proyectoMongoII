import {test} from './js/modules/test.js'


let objTest = new test();

console.log(`Prueba de test`, await objTest.getAllTest());

objTest.destructor();