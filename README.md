# Bookmarks application
Also builds to Electron App.

# Repository:
Repository:     https://github.com/CarlosGomesMarel/bookmarks/pull/3
Url:            https://black-hill-0b2ce4a1e.1.azurestaticapps.net/#/
Azure App:      https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a4168068-5051-4529-a67f-f363f912d0cf/resourcegroups/md-sb-bookmarks-rg/providers/Microsoft.Web/staticSites/md-sb-bookmarks-app/staticsite

# TODO:
- update favorite icon

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

# Local Development Setup
- Copy .env to .env.development.local
- Edit the contents to match organization
Do not checkin this file.

# Port Setup
- Copy .env.int to .env in pipeline before building

# Deployment
Create Azure App Service using Dev/Test Free F1 tier
- Use Node
- Select Windows, not Linux
- Setup github actions as in link. https://github.com/Azure-Samples/node_express_app
- Download Publish Profile from Azure Portal
- Save profile  contents as the `AZURE_WEBAPP_PUBLISH_PROFILE` secret in the github repository.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# cogswell"
"# cogswell"
