var hcsavn = JSON.parse($response.body);

hcsavn.data.start_time = 1591022354
hcsavn.data.end_time = 253394611200
hcsavn.data.flag = true

$done({body: JSON.stringify(hcsavn)});