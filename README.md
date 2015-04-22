# Apigee Proxy Seed

This project gives a base to build a simple Apigee proxy and can be used as a base to start something more complicated.

It has two end points:

* `/status` - which call a node app residing under the `/node` directory
* `/**` - which routes everything else to http://ip.jsontest.com/ (get your IP back)

It uses the [Apigee Grunt Plugin](https://github.com/apigeecs/apigee-deploy-grunt-plugin) to deploy the proxy. There is a lot more information in that repo.

To deploy the sample proxy:

```
grunt --env=test --username=_username_ /
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

### Get IP Address

Request:
```
http get https://{org}-test.apigee.net/v1/sample/blah
```

Response:
```
HTTP/1.1 200 OK
Accept-Ranges: none
Access-Control-Allow-Origin: *
Alternate-Protocol: 80:quic,p=1,80:quic,p=1
Cache-Control: private
Connection: keep-alive
Content-Type: application/json; charset=ISO-8859-1
Date: Wed, 22 Apr 2015 07:03:40 GMT
Server: Google Frontend
Transfer-Encoding: chunked
Vary: Accept-Encoding

{
    "ip": "107.23.47.166"
}
```
