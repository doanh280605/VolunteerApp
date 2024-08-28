import type {  LatLng, UserLocationChangeEvent } from "react-native-maps";
import {useEffect, useRef, useState} from 'react';
import type MapView from "react-native-maps";
import { useUserLocationStateContext } from "../../context/UserLocationContext";

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.005;  

export const useMapScreen = () => {
    const mapRef = useRef<MapView>(null);
    
    const {userLocation, setUserLocation} = useUserLocationStateContext()
    const [mapMarkers, setMapMarkers] = useState<LatLng[]>([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (userLocation) {
            mapRef.current?.animateToRegion({
                longitude: userLocation.coords.longitude,
                latitude: userLocation.coords.latitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
    }, [userLocation])

    const closeDestinationModal = () => {
        setModalVisible(false)
    }

    const handleUserLocationChange = ({
        nativeEvent: {coordinate}, 
    }: UserLocationChangeEvent) => {
        if (coordinate) {
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

    return {
        models: {
            mapRef,
            modalVisible,
            mapMarkers
        },
        operations: {
            handleUserLocationChange,
            handleMapSearchBarPress,
            closeDestinationModal, 
            handlePlaceItemPress
        },
    };
};