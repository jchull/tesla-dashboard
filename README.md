__This is a work in-progress__

**Yet another dashboard to archive and visualize data collected from the Tesla owner API.** 

Here is some charging data at a V2 Supercharger. 
![charging](./images/Charging.png)

Here is a drive.
![driving](./images/Driving.png)

## Installing

#### Clone this repository

`git clone https://github.com/jchull/tesla-dashboard.git`

#### Configure secrets
Copy server/env/sample.env to server/env/production.env
Use a complex, 32-ish char string for JWT_SECRET
TODO: setting up app user for mongo via script


#### Building
Use docker-compose
`docker-compose up`

This should start the database, and build the web+server projects and start the prod server.


TODO: add scripts to build/update 
