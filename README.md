# Apigee Proxy Seed

This project gives a base to build a simple Apigee proxy and can be used as a base to start something more complicated.

It has two end points:

* `/status` - which call a node app residing under the `/node` directory
* `/**` - which routes everything else to `https://reqbot-api.herokuapp.com` (see [github](https://github.com/typingincolor/reqbot))

It uses the [Apigee Grunt Plugin](https://github.com/apigeecs/apigee-deploy-grunt-plugin) to deploy the proxy. There is a lot more information in that repo.

To deploy the sample proxy:

```
grunt --env=dev --username=_username_ /
      --password=_password_ /
      --org=_apigee_organisation_ /
      --curl=true 
```

## Example requests

The following examples use [httpie](http://httpie.org/)

### Get Status

Request:
```
http get https://{org}-test.apigee.net/v1/sample/status
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain
Date: Wed, 22 04 2015 07:01:53 GMT
ETag: "-684271315"
X-Powered-By: Express

OK
```

### Send Reequest to Reqbot

Request:
```
http get https://{org}-test.apigee.net/v1/sample/blah
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain;charset=UTF-8
Date: Thu, 24 Sep 2015 09:37:03 GMT
Server: Cowboy
Via: 1.1 vegur
X-Reqbot-Path: /sample/blah
X-Reqbot-Querystring:

OK
```

You can see the request the Reqbot received at `https://reqbot-web.herokuapp.com/buckets/sample`

## Reqbot

You can find further details on Reqbot at [here](https://github.com/typingincolor/reqbot) and [here](https://github.com/typingincolor/reqbot-web)

