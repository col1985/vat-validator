module.exports = function() {

    'use strict';

    var logger = require('logger')();
    var soap = require('soap');

    var serviceClient = {};

    // EU VIES SOAP Service wsdl url
    var WSDL = 'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl';

    // connect to web service and return client
    soap.createClient(WSDL, function(err, client) {
        if (err || !client) {
            throw new Error(err);
        }
        logger('info', '[ Validating VAT number with VIES Service ]\n');

        serviceClient = client;
        // logger('debug', '\n' + JSON.stringify(serviceClient.describe(), null, 2));
    });

    /**
     * checkVat connects to EU VIES web service to vaildate VAT number.
     * @param  {Object}   params contains 2 properties, countyCode and vatNumber.
     * @param  {Function} callback return response object from service containing detail
     * *of company and if number is a valid VAT number.
     */
    function checkVat(params, callback) {
        if (!serviceClient) {
            throw new Error('[ checkVat ] : Cannot find instance of VIES Service client');
        }

        var countryCode = params.countryCode ? params.req.countryCode : 'IE';
        var vatNumber = params.vatNumber ? params.req.vatNumber : '9S99999L';

        // invoke SOAP operation
        serviceClient.checkVat({
            countryCode: countryCode,
            vatNumber: vatNumber
        }, function(err, result) {
            if (err) {
                return callback({
                    msg: 'Atempt to check Vat with VIES service failed',
                    err: err
                }, null);
            }

            logger('info', '[ checkVat ] : [ Request to validate VAT number with VIES web service successful ]');
            logger('debug', '\n' + JSON.stringify(result, null, 2));

            return callback(null, {
                msg: 'Success',
                data: result
            });
        });
    }

    return {
        checkVat: checkVat
    };
};