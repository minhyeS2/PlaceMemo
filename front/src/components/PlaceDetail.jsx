import './PlaceDetail.css'
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import RatingStar from './RatingStar.jsx';
import Memo from './Memo.jsx';

const PlaceDetail = ({ detail, photos, onClose }) => {
    if (!detail) return null;  // detail이 없으면 아무것도 렌더링하지 않음
    console.log(detail);
    const [activeTab, setActiveTab] = useState('review');

    return (
        <>
            <div className='detail-total'>
                <div className='detail-box'>
                    <div className='cancle-btn'>
                        <button onClick={onClose}>×</button>
                    </div>
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
                        <div><span>{detail.displayName ?? '名称なし'}</span></div>
                        <div><span>{detail.rating !== undefined ? detail.rating : '評価なし'}<RatingStar rating={detail.rating} /></span></div>
                        <div><span>{detail.userRatingCount ? `${detail.userRatingCount}件` : ''}</span></div>
                        <div><span>{detail.formattedAddress ?? '住所なし'}</span></div>
                        <div><span>{detail.businessStatus === "OPERATIONAL" ? "営業中" :
                            detail.businessStatus === "CLOSED_TEMPORARILY" ? "一時休業中" :
                                detail.businessStatus === "CLOSED_PERMANENTLY" ? "閉業済み" : "状態不明"}</span></div>
                        <div><span>{detail.regularOpeningHours?.weekdayText?.join(', ') ?? '営業時間なし'}</span></div>
                        <div><span>{detail.internationalPhoneNumber ?? '電話番号なし'}</span></div>
                    </div>
                    <div className='detail-menu'>
                        <div className={activeTab === 'review' ? 'active' : ''}
                            onClick={() => setActiveTab('review')}><span>REVIEW</span></div>
                        <div className={activeTab === 'memo' ? 'active' : ''}
                            onClick={() => setActiveTab('memo')}><span>MEMO</span></div>
                    </div>
                    {activeTab === 'review' && detail.reviews && detail.reviews.length > 0 && (
                        <div className='detail-review-total'>
                            <div className='review-box'>
                                {detail.reviews.map((review, idx) => (
                                    <div key={idx} className='review-info-box'>
                                        <div className='review-info'>
                                            <div><span>{review.authorAttribution.displayName ?? '名前なし'}</span></div>
                                            <div><span>{review.rating ?? 'なし'}<RatingStar rating={review.rating} /></span></div>
                                            <div><span>{review.relativePublishTimeDescription ?? '日付不明'}</span></div>
                                            <div><span>{review.text ?? 'レビューなし'}</span></div>
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
                        <Memo
                            detail={detail}
                        ></Memo>
                    )}

                </div>
            </div>
        </>
    )
}

export default PlaceDetail