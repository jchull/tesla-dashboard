__This is a work in-progress__

Dashboard to visualize data collected from Tesla owner API, initially stored in Elasticsearch by my other project 
[tesla-es-poller](https://github.com/jchull/tesla-es-poller) 

The backend is now provided by my other, other project, using Express and MongoDB
[tesla-dashboard-server](https://github.com/jchull/tesla-dashboard-server).

Just getting started on this, and refreshing my React skills, learning the power of TypeScript, 
and getting more-comfortable with D3. The plan is to have an easy-to-use 
dashboard that can display the most-common charts and statistics.  

Here is some charging data, just getting the basics going
![starting_to_take_shape](./images/EnergyDashboard-001.png)

Here is a drive over a high pass and down for 57 minutes using 0Wh
![thousands_of_feet_elevation_change](./images/EnergyDashboard-002.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
