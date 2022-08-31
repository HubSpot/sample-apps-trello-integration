# HubSpot-nodejs search results paging sample app

This is a sample app for the [hubspot-nodejs SDK](https://www.npmjs.com/package/@hubspot/api-client). It focuses on demonstrating of Trello integration, Trello cards and HubSpot deals in particular.

Please see the documentation on [Creating an app in HubSpot](https://developers.hubspot.com/docs/api/creating-an-ap)

### HubSpot Public API links used in this application

  - [CRM Custom Cards](https://developers.hubspot.com/docs/api/crm/extensions/custom-cards)
  - [Deals](https://developers.hubspot.com/docs/api/crm/deals)
  - [Pipelines](https://developers.hubspot.com/docs/api/crm/pipelines)

### Setup App

Make sure you have [Docker](https://www.docker.com/) installed.
Make sure you have [Docker Compose](https://docs.docker.com/compose/) installed.
Make sure you have [Ngrok](https://ngrok.com/) installed

### Configure

1. Copy .env.template to .env
2. Paste your HUBSPOT_CLIENT_ID, HUBSPOT_CLIENT_SECRET, HUBSPOT_APPLICATION_ID and HUBSPOT_DEVELOPER_API_KEY
3. Paste your TRELLO_API_KEY. You can obtain it from [https://trello.com/app-key](https://trello.com/app-key)
4. Paste your NGROK_AUTHTOKEN. You can obtain it from [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)

### Running

The best way to run this project (with the least configuration), is using docker cli.

```bash
docker-compose up --build
```
Copy the Redirect URL from the console and update your application to use it.
Give the change some time to propagate to the HubSpot OAuth servers.

Copy Ngrok url from console. Now you should now be able to navigate to that url and use the application.

### NOTE about Ngrok Too Many Connections error

If you are using Ngrok free plan and testing the application with large amount of import/deletions of Contacts you are likely to see Ngrok "Too Many Connections" error.
This is caused by a large amount of weebhooks events being sent to Ngrok tunnel. To avoid it you can deploy sample applications on your server w/o Ngrok or upgrade to Ngrok Enterprise version
