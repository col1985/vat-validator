vat-validator
====

A node module to vaildate a VAT number from any country within the European Commission. Module passes specfic countryCode and trailing VAT number to the public VIES SOAP web service and returns JSON object of request query.

####How to install?
```bash
    npm install https://github.com/col1985/vat-validator.git
``` 
###checkVat(params, callback)
    
+ @params {Object} containing properties, 
    + **countryCode** {String} states reference code  
    + **vatNumber** {String} alpha numeric block of characters
+ @callback {Function} handle response from VIES web service

For further information on country code and vatNumber format check the FAQ section [here.](http://ec.europa.eu/taxation_customs/vies/faq.html)

####How to use?

```javascript
var vatValidator = require('vaildate-vat')();

var isVaild = false;

// invoke web service op
vatValidator.checkVat({
    countryCode: 'IE',
    vatNumber: '9S99999L'
}, function(err, res) {
    // handle error
    if(err && err.msg === 'fail') {
        console.log(JSON.stringify(err, null, 2));
    }
    // handle res example
    if(res && res.valid) {
        isValid = res.valid;
    }    
 });

 if(isValid) {
    //Do something...
 }
```

####Expected sample response from VIES web service operation

```json
{
    "countryCode": "IE",
    "vatNumber": "9S99999L",
    "requestDate": null,
    "valid": true,
    "name": "Dummy Company Ltd",
    "address": "Somewhere out there, Ireland"
}
```