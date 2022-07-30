The following project is an application created in Angular version 14.1.0 to get the opening and closing prices of 5 cryptocurrencies symbols on a certain day.
I used an API of https://polygon.io/ using an APIKey; the blocked send requests are handled to avoid errors given by the API such as 429.
Likewise, a simple but informative design is maintained with colors when the currency rises or falls or if there is a connection failure, it is reported via a status bar.

### Technical details

Front-End: Angular, Typescript and CSS

<img src="/documentation/diagram/diagram.png" width="80%">

### Views

<img src="/documentation/no_access.png" width="80%">
<img src="/adocumentation/ssets//app.png" width="80%">

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
