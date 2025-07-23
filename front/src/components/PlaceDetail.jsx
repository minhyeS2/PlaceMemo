import './PlaceDetail.css'
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import RatingStar from './RatingStar.jsx';
import Memo from './Memo.jsx';
import MemoList from './MemoList.jsx';
import SelectMarker from './SelectMarker.jsx';

const PlaceDetail = ({ detail, photos, onClose, selectedIcon, setSelectedIcon }) => {
    if (!detail) return null;  // detail이 없으면 아무것도 렌더링하지 않음

    const [activeTab, setActiveTab] = useState('memo');
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    // 메모 등록 성공 시 호출해서 목록 갱신 트리거를 바꿈
    const handleMemoAdded = () => {
        setRefreshTrigger(prev => !prev);
    };


    return (
        <>
            <div className='detail-total'>
                <div className='cancle-btn'>
                    <button onClick={onClose}>×</button>
                </div>
                <div className='detail-box'>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        {photos.map((url, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='detail-pic'>
                                    <img src={url} alt={`place-photo-${idx}`}></img>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='detail-store'>
                        <div className='display-name'><span>{detail.displayName ?? '名称なし'}</span></div>
                        <div className='detail-rating'>
                            <div><span>{detail.rating !== undefined ? detail.rating : '評価なし'}</span></div>
                            <RatingStar rating={detail.rating} />
                            <div className='rating-cnt'><span>{detail.userRatingCount ? `(${detail.userRatingCount}件)` : ''}</span></div>
                        </div>
                        <div><span>{detail.formattedAddress ?? '住所なし'}</span></div>
                        <div><span>{detail.businessStatus === "OPERATIONAL" ? "営業中" :
                            detail.businessStatus === "CLOSED_TEMPORARILY" ? "一時休業中" :
                                detail.businessStatus === "CLOSED_PERMANENTLY" ? "閉業済み" : "状態不明"}</span></div>
                        {/* <div><span>{detail.regularOpeningHours?.weekdayText?.join(', ') ?? '営業時間なし'}</span></div> */}
                        <div><span>{detail.internationalPhoneNumber ?? '電話番号なし'}</span></div>
                    </div>
                    <div className='detail-menu'>
                        <div className={activeTab === 'memo' ? 'active' : ''}
                            onClick={() => setActiveTab('memo')}><span>MEMO</span></div>
                        <div className={activeTab === 'review' ? 'active' : ''}
                            onClick={() => setActiveTab('review')}><span>REVIEW</span></div>
                    </div>
                    {activeTab === 'review' && detail.reviews && detail.reviews.length > 0 && (
                        <div className='detail-review-total'>
                            <div className='review-box'>
                                {detail.reviews.map((review, idx) => (
                                    <div key={idx} className='review-info-box'>
                                        <div className='review-info'>
                                            <div className='review-name'><span>{review.authorAttribution.displayName ?? '名前なし'}</span></div>
                                            <div className='review-rating'>
                                                {/* <div><span>{review.rating ?? 'なし'}</span></div> */}
                                                <RatingStar rating={review.rating} />
                                                <div className='rating-cnt'><span>{review.relativePublishTimeDescription ?? '日付不明'}</span></div>
                                            </div>
                                            <div className='review-text'><span>{review.text ?? 'レビューなし'}</span></div>
                                        </div>
                                        {review.profilePhotoUrl && (
                                            <div className='review-pic'>
                                                <img src={review.profilePhotoUrl} alt='작성자사진' width="40" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'memo' && (
                        <>
                            <SelectMarker
                                detail={detail}
                                selected={selectedIcon}
                                onSelect={setSelectedIcon}
                            >
                            </SelectMarker>
                            <Memo
                                detail={detail}
                                onMemoAdded={handleMemoAdded}
                            ></Memo>
                            <MemoList
                                detail={detail}
                                refreshTrigger={refreshTrigger}
                            ></MemoList>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default PlaceDetail