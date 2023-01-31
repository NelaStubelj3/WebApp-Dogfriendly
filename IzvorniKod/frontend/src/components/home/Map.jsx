import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import locationService from '../../services/locationService';
import { HomeContext } from './HomeContext';

export const accessToken = 'pk.eyJ1IjoiZC13aW5rbGVyIiwiYSI6ImNsYWpnenZoMzBkMm4zcW4zN2VvaHQ2MzAifQ.NVRv1o_IVVEO_e4Cx7cRgA'

mapboxgl.accessToken = accessToken;


class SelectLocationControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        this._container.innerHTML =
        '<div class="tools-box">' +
        '<button>' +
        '<span class="mapboxgl-ctrl-icon marker-image" aria-hidden="true" title="Description"></span>' +
        '</button>' +
        '</div>';

        this._container.onclick = () => {
            window.map.toggleDraggable()
        }

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

class FilterControl {
    constructor(onClick) {
        this.onClick = onClick;
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        this._container.innerHTML =
        '<div class="tools-box">' +
        '<button>' +
        '<span class="mapboxgl-ctrl-icon filter-image" aria-hidden="true" title="Description"></span>' +
        '</button>' +
        '</div>';

        this._container.onclick = this.onClick;

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

}

export default class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        lng: 15.971116,
        lat: 45.8,
        zoom: 16,
        clickedCoordinates: {lng : 0, lat : 0},
        };

        this.marker = new mapboxgl.Marker();

        this.mapContainer = React.createRef();
        window.map = this;
        this.markerElements = [];
    }

    addDraggable(location, setSelectedLocation) {
        if(!location)
            location = [this.map.getCenter().lng, this.map.getCenter().lat]
        
        if(setSelectedLocation) {
            this.context.setSelectedLocation({
                lng: location[0],
                lat: location[1],
                locationId: undefined,
                locationProvider: "draggable"
            })
        }
            
        if(this.draggableMarker) {
            this.draggableMarker.setLngLat(location)
        } else {
            this.draggableMarker = new mapboxgl.Marker({draggable: true, scale: 1.5}).setLngLat(location).addTo(this.map)
            this.draggableMarker.on('dragend', (event) => {
                const lngLat = event.target.getLngLat()
                this.context.setSelectedLocation({
                    lng: lngLat.lng,
                    lat: lngLat.lat,
                    locationId: undefined,
                    locationProvider: "draggable"
                })
            });
        }
    }

    removeDraggable() {
        if(this.draggableMarker)
            this.draggableMarker.remove()
        this.draggableMarker = undefined
        this.context.setSelectedLocation(prevSelectedLocation => ({...prevSelectedLocation, locationProvider: undefined}))
    }

    toggleDraggable() {
        if(this.draggableMarker)
            this.removeDraggable()
        else
            this.addDraggable(undefined, true)
    }

    flyToLocation(coordinates) {
        this.map.flyTo({center: coordinates});
    }

    addLocationMarker(location) {
        const coordinates = new mapboxgl.LngLat(location.longitude, location.latitude);
        let marker;

        if(location.promoted) {
            const el = document.createElement('div');
            el.innerHTML = '<div></div>'

            switch(location.locationTypeId) {
                case 2:
                    el.firstChild.className = 'promoted-marker marker-vet';
                    break;
                case 3:
                    el.firstChild.className = 'promoted-marker marker-shop';
                    break;
                case 4:
                    el.firstChild.className = 'promoted-marker marker-hotel';
                    break;
                case 5:
                    el.firstChild.className = 'promoted-marker marker-salon';
                    break;
                case 6:
                    el.firstChild.className = 'promoted-marker marker-school';
                    break;
                default:
                    el.firstChild.className = 'promoted-marker marker-other';
            }

            marker = new mapboxgl.Marker(el).setLngLat(coordinates).addTo(this.map)
        } else {
            const options = location.dogFriendly ? {"color": "#44FF44"} : {"color": "#FF0000"}
            marker = new mapboxgl.Marker(options).setLngLat(coordinates).addTo(this.map)
        }
        
        marker.getElement().firstChild.style.transition = 'scale 0.2s'
        marker.getElement().id = location.locationTypeId

        marker.getElement().addEventListener('click', () => {
            this.context.setSelectedLocation({
                lng: location.longitude,
                lat: location.latitude,
                locationId: location.locationId,
                locationProvider: "marker"
            })

            this.context.setShowSidebar(true)
            });
        marker.getElement().addEventListener('mouseenter', () => {
            marker.getElement().firstChild.style.scale = '1.4'
        })

        marker.getElement().addEventListener('mouseleave', () => {
            marker.getElement().firstChild.style.scale = '1'
        })
        
        this.markerElements.push(marker.getElement())
    }

    componentDidMount() {

        const { lng, lat, zoom } = this.state;
        this.map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        this.map.on('dblclick', (e)=> {
            this.addDraggable([e.lngLat.lng, e.lngLat.lat], true) 
        })
    
        // fetch locations
        locationService.getAllLocations().then((response) => {
            response.data.forEach(location => {
                this.addLocationMarker(location)
            });
        })
        .catch(e => {
            console.log("Error: " + e.message);
        })

        this.map.addControl(new FilterControl(() => {
            this.context.setLocationFilter({show: !this.context.locationFilter.show, selected: this.context.locationFilter.selected}); 
        }), "bottom-right")


        this.selectedLocationControl = new SelectLocationControl()
        this.map.addControl(
            this.selectedLocationControl, "bottom-right"
        )

        this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right")

        this.map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },

                trackUserLocation: true,
                showUserHeading: true
                }), "bottom-right"
        );
    }

    render() {
        if(this.context.selectedLocation.locationProvider === 'marker')
            this.removeDraggable()

        for(let markerElement of this.markerElements) {
            if(this.context.locationFilter.selected.has(Number(markerElement.id))) {
                markerElement.style.opacity = '1'
            } else {
                markerElement.style.opacity = '0'
            }
        }

        return (
            <div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}
Map.contextType = HomeContext;