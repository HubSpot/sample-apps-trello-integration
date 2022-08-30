# HubSpot Trello integration sample app

This is a sample app for the HubSpot [client libraries](https://developers.hubspot.com/docs/api/overview). This sample app demonstrates how to integate your Hubspot app with Trello.

## Reference

- [Trello](https://trello.com/)
- [Trello API](https://developer.atlassian.com/cloud/trello/)

## How to run locally

1. The first step is to [create a HubSpot developer account](https://developers.hubspot.com/docs/api/developer-tools-overview). This is where you will create and manage HubSpot apps.
2. Next [create an app](https://developers.hubspot.com/docs/api/creating-an-app). On the "App info" tab, You will be prompted to fill out some basic information about your app. This includes name, description, logo, etc.
3. Copy the .env.template file into a file named .env in the folder of the language you want to use. For example:

```bash
cp ruby/.env.template ruby/.env
```

4. Paste your HubSpot API Key as the value for HUBSPOT_API_KEY in .env
5. Paste you TRELLO_API_KEY. You can obtain it from [Trello API key](https://trello.com/app-key)
6. Follow the language instructions on how to run.

## Supported languages

* [JavaScript (Node)](node/README.md)
* [Php](php/README.md)
* [Python](python/README.md)
* [Ruby](ruby/README.md)
