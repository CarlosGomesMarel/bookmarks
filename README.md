# Bookmarks application
Also builds to Electron App.

# Repository:
Repository:     https://github.com/CarlosGomesMarel/bookmarks
Url:            https://gentle-grass-0b1856c03.2.azurestaticapps.net/#/
Resource Group: md-sb-bookmarks-rg
App:            md-sb-bookmarks-app
Azure App:      https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a4168068-5051-4529-a67f-f363f912d0cf/resourcegroups/md-sb-bookmarks-rg/providers/Microsoft.Web/staticSites/md-sb-bookmarks-app/staticsite

# How to
1. Create Static Web App
2. Specify Other insteadh of Github, Azure Devops
3. Create Statick web app
4. Click `Manage deployment token`
5. Update token under https://github.com/CarlosGomesMarel/bookmarks/settings/secrets/actions

- https://endjin.com/blog/2021/08/how-to-deploy-vue-app-to-azure-static-web-apps-using-azure-devops-and-yaml


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
