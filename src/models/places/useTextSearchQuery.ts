import {useEffect, useState} from 'react'
import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { useUserLocationStateContext } from 'context/UserLocationContext';
import type { TextSearchItem } from './types/TextSearchItem';

type TextSearchQueryResponse = AxiosResponse<{
    status: string;
    results: TextSearchItem[]
}>;

export const useTextSearchQuery = (searchQuery?: string) => {
    const [responseData, setResponseData] = useState<TextSearchQueryResponse['data']>();
    const {userLocation} = useUserLocationStateContext();

    const requestUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'

    useEffect(() => {
        if (searchQuery && searchQuery !== '') {
            (async () => {
                try {
                    const {data} = await axios.get<any, TextSearchQueryResponse>(requestUrl, {
                        params: {
                            query: searchQuery,
                            location: `${userLocation?.coords.latitude}, ${userLocation?.coords.longitude}`,
                            key: GOOGLE_MAPS_API_KEY
                        }
                    });
                    setResponseData(data)
                } catch (error) {
                    console.log(error)
                }
            })()
        } else {
            setResponseData(undefined);
        }
    }, [
        searchQuery,    
        userLocation?.coords.latitude,
        userLocation?.coords.longitude
    ]);

    return {responseData}
}