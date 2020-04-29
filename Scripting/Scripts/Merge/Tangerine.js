/*
hostname = api.revenuecat.com
*/

/*Using Surge & Quantumult X Script*/
let obj=JSON.parse($response.body);
let url=$request.url;
            // Tangarine Premium
    if (url.indexOf("RCAnonymousID")!=-1) {
        obj= {
  "request_date_ms": 1581296781673,
  "request_date": "2020-02-10T01:06:21Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2020-02-09T02:07:32Z",
    "original_application_version": "293",
    "other_purchases": {
    },
    "subscriptions": {
      "co.bitdreams.Tangerine.premium": {
        "is_sandbox": false,
        "period_type": "active",
        "billing_issues_detected_at": null,
        "unsubscribe_detected_at": null,
        "expires_date": "2099-02-16T02:08:10Z",
        "original_purchase_date": "2020-02-09T02:08:11Z",
        "purchase_date": "2020-02-09T02:08:10Z",
        "store": "app_store"
      }
    },
    "entitlements": {
      "Premium": {
        "expires_date": "2099-02-16T02:08:10Z",
        "product_identifier": "co.bitdreams.Tangerine.premium",
        "purchase_date": "2020-02-09T02:08:10Z"
      }
    },
    "original_purchase_date": "2020-02-02T07:11:22Z",
    "original_app_user_id": "$RCAnonymousID:38397cb5e83845c6bcb280c9dd7f7c1d",
    "last_seen": "2020-02-10T01:05:49Z"
  }
}
}

$done({body:JSON.stringify(obj)});