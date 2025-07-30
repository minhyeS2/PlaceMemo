import './Map.css';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import SearchList from './SearchList';
import PlaceDetail from './PlaceDetail';
import Login from './Login';
import SignUp from './SignUp';
import SearchBox from './SearchBox';
import SlidingPanel from './SlidingPanel';
import SelectMarker from './SelectMarker';
import Memo from './Memo';
import MemoList from './MemoList';


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ['places', 'marker'];

const center = { lat: 35.681236, lng: 139.767125 };
// const containerStyle = {
//     height: '500px',
//     width: '800px',
// };

const Map = ({ activeMenu, setActiveMenu, setIsLoggedIn, setNickname }) => {
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [savedMarkers, setSavedMarkers] = useState([]); // 저장된 마커들 (placeId + 위치 + icon)
    const [savedSelectedMarker, setSavedSelectedMarker] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);


    console.log(savedMarkers);

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
            fetchsavedIcons();
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
                    businessStatus: place.businessStatus,
                    rating: place.rating,
                    ratingCnt: place.userRatingCount,
                }));

                // console.log(newMarkers);
                setMarkers(newMarkers);
                setIsSearchActive(true);

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

    const handleSavedInfoWindow = (UserMarker) => {
        setSavedSelectedMarker(UserMarker);
    }
    
    const handleMemoUpdated = (updatedMemo) => {
        console.log("✅ 업데이트된 메모:", updatedMemo);

        setSavedMarkers((prev) => {
            const result = prev.map(marker => {
                console.log("🟡 비교 중:", marker.placeId, "vs", updatedMemo.placeId);
                if (marker.placeId === updatedMemo.placeId) {
                    console.log("✅ 매치됨 → 아이콘 갱신");
                    return { ...marker, iconUrl: updatedMemo.iconUrl };
                }
                return marker;
            });
            console.log("🟢 최종 마커 목록:", result);
            return result;
        });
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

    // 사용자별 저장된 마커 가져오기
    const fetchsavedIcons = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8081/icons`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Markerの取得に失敗しました');
            }
            const data = await response.json();
            console.log(data);
            setSavedMarkers(data);

        } catch (error) {
            console.error(error);
            alert('Marker取得エラー');
        }

    }




    return isLoaded ? (
        <>
            <div className='map-total'>
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={13}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={() => setSelectedMarker(null)}
                    options={
                        {
                            disableDefaultUI: true
                        }
                    }

                >
                    {markers.map(marker => {
                        const isSaved = savedMarkers.some(saved => saved.placeId === marker.placeId);

                        // 저장된 장소면 검색 마커는 그리지 않음
                        if (isSaved) return null;

                        return (
                            <Marker
                                key={marker.placeId}
                                position={marker.position}
                                onClick={() => handleInfoWindow(marker)}
                            />
                        );
                    })}
                    {savedMarkers.map(saved => (
                        <Marker
                            key={saved.pk}
                            position={{
                                lat: Number(saved.placeLat),
                                lng: Number(saved.placeLng)
                            }}
                            icon={{
                                url: saved.iconUrl,
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            onClick={() => handleSavedInfoWindow(saved)}
                        >
                        </Marker>
                    ))}
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
                    {savedSelectedMarker && (
                        <InfoWindow
                            position={{
                                lat: Number(savedSelectedMarker.placeLat),
                                lng: Number(savedSelectedMarker.placeLng)
                            }}
                            onCloseClick={() => setSavedSelectedMarker(null)}
                        >
                            <div>
                                <h3>{savedSelectedMarker.placeName}</h3>
                                <p>{savedSelectedMarker.placeAddress}</p>
                                <p>{savedSelectedMarker.placeStatus}</p>
                            </div>
                        </InfoWindow>
                    )
                    }
                </GoogleMap>
                <SearchBox
                    keyword={keyword}
                    onChangeKeyword={(e) => setKeyword(e.target.value)}
                    onSearch={handleSearch}
                >
                </SearchBox>


                {/* <SlidingPanel
                    isOpen={!!selectedDetail}
                    onClose={() => setSelectedDetail(null)}
                >
                </SlidingPanel> */}
                {selectedDetail && (
                    <PlaceDetail
                        detail={selectedDetail}
                        photos={photos}
                        onClose={() => setSelectedDetail(null)} // 내부에서도 닫기 가능
                        selectedIcon={selectedIcon}
                        setSelectedIcon={setSelectedIcon}
                        setRefreshTrigger={setRefreshTrigger}
                        savedMarkers={savedMarkers}
                        onMemoUpdated={handleMemoUpdated} // 메모 컴포넌트에 다시 넘겨줘서 업데이트 되도록 해야함.
                    />
                )}


                {/* 일단 로그인 후, 검색 가능 하게 처리할것
                로그인 후, 헤더에 닉네임 표시하기
                메모 필터 기능 보이게 하기...등등
                일단은 탭 기능만 구현
                */}
                {activeMenu === 'login' &&
                    <Login
                        setActiveMenu={setActiveMenu}
                        setIsLoggedIn={setIsLoggedIn}
                        setNickname={setNickname}
                    ></Login>
                }
                {activeMenu === 'signUp' &&
                    <SignUp
                        setActiveMenu={setActiveMenu}
                    ></SignUp>
                }
                {activeMenu === 'search' &&
                    <SearchList
                        markers={markers}
                        onSelect={(placeId) => {
                            fetchDetail(placeId);
                        }}
                        isSearchActive={isSearchActive}
                    >
                    </SearchList>
                }
                {activeMenu === 'my-memos' &&
                    <MemoList
                        detail={selectedDetail}
                        refreshTrigger={refreshTrigger}
                        selected={selectedIcon}
                        onSelect={setSelectedIcon}
                    ></MemoList>
                }
            </div>
        </>
    ) : (
        <></>
    )
}

export default Map