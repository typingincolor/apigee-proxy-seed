# Apigee Proxy Seed

This project gives a base to build a simple Apigee proxy and can be used as a base to start something more complicated.

It has two end points:

* `/status` - which call a node app residing under the `/node` directory
* `/**` - which routes everything else to http://ip.jsontest.com/ (get you IP back)

It uses the [Apigee Grunt Plugin](https://github.com/apigeecs/apigee-deploy-grunt-plugin) to deploy the proxy. There is a lot more information in that repo.

To deploy the sample proxy:

```
grunt --env=test --username=_username_ --password=_password_ --org=_apigee_organisation_ --curl=true 
```
