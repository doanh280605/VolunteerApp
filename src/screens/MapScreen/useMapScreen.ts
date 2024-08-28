import type {  LatLng, UserLocationChangeEvent } from "react-native-maps";
import {useCallback, useEffect, useRef, useState} from 'react';
import type MapView from "react-native-maps";
import { useUserLocationStateContext } from "../../context/UserLocationContext";
import { MapDirectionsResponse } from "react-native-maps-directions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.005;  

export const useMapScreen = () => {
    const mapRef = useRef<MapView>(null);
    
    const {userLocation, setUserLocation} = useUserLocationStateContext()
    const [mapMarkers, setMapMarkers] = useState<LatLng[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [mapDirections, setMapDirections] = useState<MapDirectionsResponse>()
    const insets = useSafeAreaInsets() 

    const isRouteVisible = mapMarkers.length === 2

    useEffect(() => {
        if(mapDirections?.coordinates){
            mapRef.current?.fitToCoordinates(mapDirections?.coordinates, {
                edgePadding: {
                    top: insets.top + scale(15),
                    bottom: scale(15),
                    left: scale(15),
                    right: scale(15)
                }
            })
        }
    }, [mapDirections?.coordinates, insets.top])

    const centerToUserLocation = useCallback(() => {
        if(userLocation) {
            mapRef.current?.animateToRegion({
                longitude: userLocation.coords.longitude,
                latitude: userLocation.coords.latitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        }
    }, [userLocation])

    useEffect(() => {
        centerToUserLocation();
    }, [centerToUserLocation])

    const closeDestinationModal = () => {
        setModalVisible(false)
    }

    const handleUserLocationChange = ({
        nativeEvent: {coordinate}, 
    }: UserLocationChangeEvent) => {
        if (coordinate && !modalVisible && !isRouteVisible) {
            setUserLocation({
                coords: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
            })
        }
    };

    const handleMapSearchBarPress = () => {
        setModalVisible(true);
    }

    const handlePlaceItemPress = (coords: LatLng) => {
        if (userLocation?.coords) {
            setMapMarkers([userLocation?.coords, coords]);
            setModalVisible(false);
        }
    }

    const handleMapDirectionReady = (routeInfo: MapDirectionsResponse) => {
        setMapDirections(routeInfo)
    }

    const handleRoundButtonPress = () => {
        if(isRouteVisible) {
            setMapMarkers([]);
            centerToUserLocation()
        }
    }

    return {
        models: {
            mapRef,
            modalVisible,
            mapMarkers, 
            isRouteVisible, 
            mapDirections
        },
        operations: {
            handleUserLocationChange,
            handleMapSearchBarPress,
            closeDestinationModal, 
            handlePlaceItemPress,
            handleMapDirectionReady, 
            handleRoundButtonPress
        },
    };
};