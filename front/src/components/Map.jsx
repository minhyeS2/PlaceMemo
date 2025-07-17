import './Map.css';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import SearchList from './SearchList';
import PlaceDetail from './PlaceDetail';
import Login from './Login';
import SignUp from './SignUp';


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ['places', 'marker'];

const center = { lat: 35.681236, lng: 139.767125 };
const containerStyle = {
    height: '500px',
    width: '800px',
};

const Map = ( {activeMenu, setActiveMenu} ) => {
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState("/marker-red.png");

    const mapRef = useRef(null);

    // console.log(API_KEY); // 구글 맵API 키 확인용
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        region: 'JP',
        language: 'ja',
        libraries: libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            (async () => {
                const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
                const MarkerInstance = new AdvancedMarkerElement();

            })();
        }
    }, [isLoaded]);


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

    const createDetailRequest = (placeId) => ({
        fields: ['location', 'displayName', 'formattedAddress',
            'internationalPhoneNumber', 'businessStatus', 'regularOpeningHours',
            'rating', 'userRatingCount', 'photos', 'reviews'],
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
        // fetchDetail(marker.placeId);
    };

    // placeId(고유 아이디)를 서버에 전달해서,
    // 그에 맞는 장소 상세 정보 데이터를 구글 서버에서 받아오는 매서드
    const fetchDetail = async (placeId) => {
        try {
            const { Place } = await window.google.maps.importLibrary('places');
            const placeInstance = new Place({ id: placeId }); // 받아온 아이디로 객체 생성

            const request = createDetailRequest(placeId);
            const placeDetail = await placeInstance.fetchFields(request);

            console.log(placeDetail.place.reviews)

            //사진 정보 처리하기
            const photoUrls = (placeDetail.place.photos || []).map(photo =>
                `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=${API_KEY}`
            );
            setPhotos(photoUrls);

            setSelectedDetail(placeDetail.place);

        } catch (err) {
            console.error("詳細取得に失敗しました", err);
        }
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
                    <PlaceDetail
                        detail={selectedDetail}
                        photos={photos}
                        onClose={() => setSelectedDetail(null)}
                        selectedIcon={selectedIcon}
                        setSelectedIcon={setSelectedIcon}>
                    </PlaceDetail>
                </GoogleMap>
                

                {/* 일단 로그인 후, 검색 가능 하게 처리할것
                로그인 후, 헤더에 닉네임 표시하기
                메모 필터 기능 보이게 하기...등등
                일단은 탭 기능만 구현
                */}
                { activeMenu === 'login' &&
                <Login
                    setActiveMenu={setActiveMenu}
                ></Login>
                } 
                { activeMenu === 'signUp' &&
                <SignUp
                    setActiveMenu={setActiveMenu}
                ></SignUp>
                }
                { activeMenu === 'search' &&
                <SearchList
                    keyword={keyword}
                    onChangeKeyword={(e) => setKeyword(e.target.value)}
                    onSearch={handleSearch}
                    markers={markers}
                    onSelect={(placeId) => {
                        fetchDetail(placeId);
                    }}
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