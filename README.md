# Brainbase

The following project is an application created in Angular version 14.1.0 to get the open and close prices of 5 cryptocurrencies symbols on a certain day. I used an API of https://polygon.io/ using an APIKey. Errors and blocking of sending requests are handled in the same to avoid errors given by the API such as 429. Likewise, a simple but informative design is maintained with colors when the currency rises or falls or if there is a connection failure, it is reported via a status bar.

### Technical details

Front-End: Angular, Typescript and CSS

<img src="/assets/diagram/diagram.png" width="80%">

### Views

<img src="/assets/no_access.png" width="80%">
<img src="/assets//app.png" width="80%">

## Project Hosting 
<https://aistica.com/brainbase/>

## Available Scripts

In the project directory, you can run:

### `ng serve`

To view in the browser
Local [http://localhost:4200]

Remote [https://aistica.com/brainbase]

## API ENDPOINTS

### POLYGON.io

* [https://polygon.io/v1/open-close/crypto/{from}/{to}/{date}]