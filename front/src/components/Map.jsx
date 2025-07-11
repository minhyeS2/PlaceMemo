import './Map.css';
import React, { useCallback, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SearchList from './SearchList';
import Login from './Login';
import SignUp from './SignUp';


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ['places', 'marker'];

const center = { lat: 35.681236, lng: 139.767125 };
const containerStyle = {
    height: '500px',
    width: '800px',
};

const Map = ( {activeMenu} ) => {
    const [map, setMap] = useState(null);

    const mapRef = useRef(null);

    // console.log(API_KEY); // 구글 맵API 키 확인용

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        region: 'JP',
        language: 'ja',
        libraries: libraries,
    });

    const onLoad = useCallback(function callback(map) {
        setMap(map);
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
        mapRef.current = null;
    }, []);



    return isLoaded ? (
        <>
            <div className='map-total'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={() => setSelectedMarker(null)}
                >
                    {/* Child components, such as markers, info windows, etc. */                    }
                </GoogleMap>
                

                {/* 일단 로그인 후, 검색 가능 하게 처리할것*/}
                { activeMenu === 'login' &&
                <Login></Login>
                } 
                { activeMenu === 'signUp' &&
                <SignUp></SignUp>
                }
                { activeMenu === 'search' &&
                <SearchList>
                </SearchList>
                }
            </div>
        </>
    ) : (
        <></>
    )
}

export default Map