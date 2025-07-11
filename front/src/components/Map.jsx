import './Map.css';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
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
    const [keyword, setKeyword] = useState("");
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

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

    const clearMarker = () => {
        setMarkers([]);
    };

    const clearInfoWindow = () => {
        setSelectedMarker(null);
    };

    const createSearchRequest = (keyword) => ({
        textQuery: keyword,
        fields: ['displayName', 'location', 'formattedAddress',
            'businessStatus', 'rating', 'userRatingCount',],
        language: 'ja-JP',
        region: 'jp',
        locationBias: center,
        // useStrictTypeFiltering: false,
    });


    // 검색시 키워드에 관한 정보를 받아오는 매서드
    const handleSearch = async () => {
        if (!map || !window.google) {
            console.log("地図の表示ができません。")
            return;
        }

        clearMarker();
        clearInfoWindow();

        const request = createSearchRequest(keyword);

        try {
            const { places } = await google.maps.places.Place.searchByText(request);
            console.log(places);

            if (places.length) {
                const bounds = new window.google.maps.LatLngBounds();

                const newMarkers = places.map(place => ({
                    placeId: place.id,
                    position: place.location,
                    name: place.displayName,
                    address: place.formattedAddress,
                    businessStatus: place.businessStatus, // 가공할 필요 있음
                    rating: place.rating, // 별점 레이팅으로 만드는 라이브러리 or 기능 만들기
                    ratingCnt: place.userRatingCount,
                }));

                // console.log(newMarkers);
                setMarkers(newMarkers);

                newMarkers.forEach(m => bounds.extend(m.position));
                mapRef.current.fitBounds(bounds);

            } else {
                console.log("検索結果が見つかりませんでした。");
            }
        } catch (err) {
            console.error("検索中にエラーが発生しました：", err);
        }
    };

    const handleInfoWindow = (marker) => {
        setSelectedMarker(marker);
    };




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
                    {/* Child components, such as markers, info windows, etc. */
                        markers.map((marker) => (
                            <Marker
                                key={marker.placeId}
                                position={marker.position}
                                onClick={() => handleInfoWindow(marker)}
                            >
                            </Marker>
                        ))
                    }
                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker.position}
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <div>
                                <h3>{selectedMarker.name}</h3>
                                <p>{selectedMarker.address}</p>
                                <p>{selectedMarker.businessStatus}</p>
                            </div>
                        </InfoWindow>
                    )
                    }
                </GoogleMap>
                

                {/* 일단 로그인 후, 검색 가능 하게 처리할것
                로그인 후, 헤더에 닉네임 표시하기
                메모 필터 기능 보이게 하기...등등
                일단은 탭 기능만 구현
                */}
                { activeMenu === 'login' &&
                <Login></Login>
                } 
                { activeMenu === 'signUp' &&
                <SignUp></SignUp>
                }
                { activeMenu === 'search' &&
                <SearchList
                    keyword={keyword}
                    onChangeKeyword={(e) => setKeyword(e.target.value)}
                    onSearch={handleSearch}
                    markers={markers}
                >
                </SearchList>
                }
            </div>
        </>
    ) : (
        <></>
    )
}

export default Map