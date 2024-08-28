import React from 'react'

import { useMapScreen } from './useMapScreen'
import { StyledMapView, Container } from './MapScreenStyles'
import { RoundButton } from '../../components/RoundButton';
import { MapSearchBar } from '../../components/MapSearchBar';
import { DestinationModal } from '../../components/DestinationModal';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';

export const MapScreen = () => {
    const {models, operations} = useMapScreen();

    const renderMapMarkers = () => {
        return models.mapMarkers.map((item, index) => {
            return <Marker coordinate={item} key={index} />
        })
    }

    return (
        <Container>
            <StyledMapView 
                ref={models.mapRef}
                showsUserLocation
                onUserLocationChange={operations.handleUserLocationChange}
                showsMyLocationButton={false}
                showsCompass={false}>
                {renderMapMarkers()}
            </StyledMapView>
            <MapSearchBar onPress={operations.handleMapSearchBarPress}/>
            <RoundButton icon="menu-outline"/>
            <DestinationModal 
                visible={models.modalVisible} 
                closeModal={operations.closeDestinationModal} 
                onPlaceItemPress={operations.handlePlaceItemPress}
            />
        </Container>
    )
}