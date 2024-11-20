# Weather App

A simple web application that displays the current weather and hourly forecast for any city. Users can toggle between Celsius and Fahrenheit units.

## Features

- **Search Weather by City:** Enter a city name to get the current weather.
- **Hourly Forecast:** View the hourly weather forecast for the next 24 hours.
- **Unit Toggle:** Switch between Celsius and Fahrenheit for temperature display.

## How to Use

1. **Open the App:**

   - Open the `index.html` file in your web browser.

2. **Enter City Name:**

   - Type the name of the city you want to check in the input field.

3. **Get Weather:**

   - Click the **Search** button to retrieve the weather information.

4. **Toggle Units:**
   - Click the **°F** or **°C** button to switch temperature units.

## Setup

### API Key

The app uses the OpenWeatherMap API. You'll need to provide your own API key.

1. **Get an API Key:**

   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) to obtain a free API key.

2. **Update `script.js`:**

   - Open `script.js` in a text editor.
   - Replace the existing API key with your own:

     ```javascript
     const apiKey = "YOUR_API_KEY_HERE";
     ```

## Files

- **index.html:** The main HTML structure of the app.
- **styles.css:** Contains the styling for the app.
- **script.js:** Includes the JavaScript code for fetching and displaying weather data.

## License

This project is licensed under the MIT License.
