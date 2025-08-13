import './PlaceDetail.css'
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import RatingStar from './RatingStar.jsx';
import Memo from './Memo.jsx';

const PlaceDetail = ({
    detail,
    photos,
    onClose,
    selectedIcon,
    setSelectedIcon,
    refreshTrigger,
    setSelectedDetail,
    isMemoOpen,
    setIsMemoOpen,
    onMemoAdded,
    onMemoUpdated,
    onMemoDeleted,
    memos,
    setMemos
}) => {
    if (!detail) return null;  // detail이 없으면 아무것도 렌더링하지 않음

    const [activeTab, setActiveTab] = useState('memo');
    // 리뷰별 확장 상태 관리용
    const [expandedReviews, setExpandedReviews] = useState({});

    const toggleReviewExpand = (idx) => {
        setExpandedReviews(prev => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    return (
        <>
            <div className='detail-total'>
                <div className='button-total'>
                    <div className='cancel-icon'>
                        <img
                            src={'/icons/cancel.png'}
                            alt="close"
                            onClick={onClose}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div className='memo-icon'>
                        <img
                            src={'/icons/memo.png'}
                            alt="memo"
                            onClick={() => setIsMemoOpen(prev => !prev)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
                <div className='detail-box'>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        {photos.map((url, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='detail-pic'>
                                    <img src={url} alt={`place-photo-${idx}`} />
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
                        <div><span>{detail.businessStatus === "OPERATIONAL" ? "営業中" :
                            detail.businessStatus === "CLOSED_TEMPORARILY" ? "一時休業中" :
                                detail.businessStatus === "CLOSED_PERMANENTLY" ? "閉業済み" : "状態不明"}</span></div>
                        <div><span>{detail.formattedAddress ?? '住所なし'}</span></div>
                        {/* <div><span>{detail.regularOpeningHours?.weekdayText?.join(', ') ?? '営業時間なし'}</span></div> */}
                        <div><span>{detail.internationalPhoneNumber ?? '電話番号なし'}</span></div>
                    </div>
                    <div className='detail-menu'>
                        <div
                            className={activeTab === 'review' ? 'active' : ''}
                            onClick={() => setActiveTab(prev => (prev === 'review' ? '' : 'review'))}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>REVIEW</span>
                        </div>
                        {/* <div className={activeTab === 'status' ? 'active' : ''}
                            onClick={() => setActiveTab('status')}><span>STATUS</span></div> */}
                    </div>
                    {activeTab === 'review' && detail.reviews && detail.reviews.length > 0 && (
                        <div className='detail-review-total'>
                            <div className='review-box'>
                                {detail.reviews.map((review, idx) => {
                                    const limit = 100;
                                    const text = review.text ?? 'レビューなし';
                                    const isLong = text.length > limit;
                                    const isExpanded = expandedReviews[idx] || false;
                                    const displayText = isExpanded || !isLong ? text : text.slice(0, limit) + ' ...';

                                    return (
                                        <div key={idx} className='review-info-box'>
                                            <div className='review-info'>
                                                <div className='review-name'>
                                                    <span>{review.authorAttribution?.displayName ?? '名前なし'}</span>
                                                </div>
                                                <div className='review-rating'>
                                                    <RatingStar rating={review.rating} />
                                                    <div className='rating-cnt'>
                                                        <span>{review.relativePublishTimeDescription ?? '日付不明'}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className='review-text'
                                                    style={{ cursor: isLong ? 'pointer' : 'default', userSelect: 'none' }}
                                                    onClick={() => isLong && toggleReviewExpand(idx)}
                                                >
                                                    <span>{displayText}</span>
                                                    {isLong && (
                                                        <div className='review-more'>
                                                            <span>
                                                               [{isExpanded ? '（閉じる）' : '（もっと見る）'}]
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {review.profilePhotoUrl && (
                                                <div className='review-pic'>
                                                    <img src={review.profilePhotoUrl} alt='작성자사진' width="40" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {activeTab === 'status' && (
                        <>
                            <div><span>{detail.businessStatus === "OPERATIONAL" ? "営業中" :
                                detail.businessStatus === "CLOSED_TEMPORARILY" ? "一時休業中" :
                                    detail.businessStatus === "CLOSED_PERMANENTLY" ? "閉業済み" : "状態不明"}</span></div>
                        </>
                    )}
                </div>
            </div>

            {isMemoOpen && (
                <Memo
                    detail={detail}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    refreshTrigger={refreshTrigger}
                    setSelectedDetail={setSelectedDetail}
                    setIsMemoOpen={setIsMemoOpen}
                    onMemoAdded={onMemoAdded}
                    onMemoUpdated={onMemoUpdated}
                    onMemoDeleted={onMemoDeleted}
                    memos={memos}
                    setMemos={setMemos}
                />
            )}
        </>
    )
}

export default PlaceDetail;
