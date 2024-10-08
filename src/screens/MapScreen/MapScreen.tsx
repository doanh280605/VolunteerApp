import React from 'react'

import { useMapScreen } from './useMapScreen'
import { StyledMapView, Container } from './MapScreenStyles'
import { RoundButton } from '../../components/RoundButton';
import { MapSearchBar } from '../../components/MapSearchBar';
import { DestinationModal } from '../../components/DestinationModal';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useTheme } from '@emotion/react';
import { scale } from 'react-native-size-matters';

export const MapScreen = () => {
    const {models, operations} = useMapScreen();
    const theme = useTheme()

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
                showsCompass={false}
            >
                {renderMapMarkers()}
                <MapViewDirections 
                    origin={models.mapMarkers[0]}
                    destination={models.mapMarkers[1]}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeColor={theme.colors.screens.mapScreen.directionsStroke}
                    strokeWidth={scale(5)}
                    onReady={operations.handleMapDirectionReady}
                />
            </StyledMapView>
            {models.isRouteVisible || models.modalVisible ? null : (
                <MapSearchBar onPress={operations.handleMapSearchBarPress}/>
            )}
            <RoundButton 
                onPress={operations.handleRoundButtonPress}
                icon={models.isRouteVisible ? 'arrow-back-outline' : 'menu-outline'}
            />
            <DestinationModal 
                visible={models.modalVisible} 
                closeModal={operations.closeDestinationModal} 
                onPlaceItemPress={operations.handlePlaceItemPress}
            />
        </Container>
    )
}