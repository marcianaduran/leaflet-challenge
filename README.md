# Leaflet Challenge

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Your first task is to visualize an earthquake dataset.

### Instructions: 
1. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and choose a dataset to visualize.
2. Use the URL of this JSON to pull in the data for the visualization.
3. Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    * Include popups that provide additional information about the earthquake when its associated marker is clicked.
    * Create a legend that will provide context for your map data.
4. Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates
    * Plot the tectonic plates dataset on the map in addition to the earthquakes.
    * Add other base maps to choose from.
    * Put each dataset into separate overlays that can be turned on and off independently.
    * Add layer controls to your map.
