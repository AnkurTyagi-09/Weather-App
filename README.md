# Weather App

A simple weather application that displays the current weather and a 5-day forecast for any city using the [OpenWeatherMap API](https://openweathermap.org/api).

## Features

- Search for any city to get real-time weather data
- Displays temperature, humidity, wind speed, and weather condition icon
- Shows a 5-day weather forecast with icons
- Error handling for invalid city names

## Folder Structure

```
Weather App/
├── images/
│   ├── clouds.png
│   ├── clear.png
│   ├── rain.png
│   ├── drizzle.png
│   ├── mist.png
│   ├── snow.png
│   ├── humidity.png
│   └── wind.png
├── index.html
├── script.js
└── style.css
```

## Setup

1. **Clone or Download** this repository.
2. **Get an API Key** from [OpenWeatherMap](https://openweathermap.org/api).
3. **Replace** the `apiKey` value in `script.js` with your own API key.
4. **Ensure** all images are present in the `images` folder.
5. **Open** `index.html` in your browser.

## Usage

- Enter a city name in the search box and click the search button.
- The app will display the current weather and a 5-day forecast for the city.

## Dependencies

- [Font Awesome](https://fontawesome.com/) for the search icon (loaded via CDN).

## Customization

- You can replace the weather icons in the `images` folder with your own.
- Modify `style.css` to change the look and feel of the app.

## License

This project
