/* hostname = commerce-i18n-api.faceu.mobi */

var hcsavn = JSON.parse($response.body);

hcsavn.data.start_time = 1591022354
hcsavn.data.end_time = 4102419599
hcsavn.data.flag = true

$done({body: JSON.stringify(hcsavn)});