# HubSpot PHP Sample Trello Integration App

This is a sample app for the hubspot-php SDK. Currently, this app focuses on demonstrating
of Trello integration, Trello cards and HubSpot deals in particular.

Please see the documentation on [Creating an app in HubSpot](https://developers.hubspot.com/docs-beta/creating-an-app)

### HubSpot Public API endpoints used in this application

  - [CRM Custom Cards](https://developers.hubspot.com/docs/api/crm/extensions/custom-cards)
  - [OAuth](https://developers.hubspot.com/docs-beta/working-with-oauth)

### Setup App

Make sure you have:
  - [Docker Compose](https://docs.docker.com/compose/) installed
  - [Ngrok account](https://ngrok.com/)
  - [Trello account](https://trello.com/)

### Configure

1. Copy .env.template to .env
2. Paste your Ngrok authtoken to NGROK_AUTHTOKEN in .env
3. Paste your HUBSPOT_CLIENT_ID, HUBSPOT_CLIENT_SECRET, HUBSPOT_APPLICATION_ID and HUBSPOT_DEVELOPER_API_KEY
4. Paste youк TRELLO_API_KEY. You can obtain it from [https://trello.com/app-key](https://trello.com/app-key)
5. Go to [https://trello.com/app-key](https://trello.com/app-key) page and paste https://*.ngrok.io to "New Allowed Origin" ("Allowed Resources" section)

### Running

The best way to run this project (with the least configuration), is using docker compose.  Change to the webroot and start it

```bash
docker-compose up --build
```

Copy Ngrok url from console. Now you should now be able to navigate to that url and use the application.
