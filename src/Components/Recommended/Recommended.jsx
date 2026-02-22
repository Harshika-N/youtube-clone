import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_convertor } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId, videoId}) => {
    const [apiData,setApiData] = useState([]);

    const fetchVideoDetails = async (ids) => {
        if (!ids.length) return [];
        const detailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(',')}&key=${API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        return detailsData.items || [];
    };

    const fetchData = async () =>{
        if (!videoId) return;

        let items = [];

        try {
            const relatedSearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20&key=${API_KEY}`;
            const relatedSearchResponse = await fetch(relatedSearchUrl);
            const relatedSearchData = await relatedSearchResponse.json();
            const relatedIds = (relatedSearchData.items || [])
              .map((item) => item.id?.videoId)
              .filter((id) => id && id !== videoId);
            items = await fetchVideoDetails(relatedIds);
        } catch (error) {
            items = [];
        }

        if (!items.length) {
            try {
                const currentVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
                const currentVideoResponse = await fetch(currentVideoUrl);
                const currentVideoData = await currentVideoResponse.json();
                const currentTitle = currentVideoData.items?.[0]?.snippet?.title || '';
                const query = currentTitle.split(' ').slice(0, 6).join(' ');

                if (query) {
                    const querySearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(query)}&key=${API_KEY}`;
                    const querySearchResponse = await fetch(querySearchUrl);
                    const querySearchData = await querySearchResponse.json();
                    const queryIds = (querySearchData.items || [])
                      .map((item) => item.id?.videoId)
                      .filter((id) => id && id !== videoId);
                    items = await fetchVideoDetails(queryIds);
                }
            } catch (error) {
                items = [];
            }
        }

        if (!items.length) {
            const fallbackUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
            const fallbackResponse = await fetch(fallbackUrl);
            const fallbackData = await fallbackResponse.json();
            items = fallbackData.items || [];
        }

        setApiData(items);
    }
    useEffect(() =>{
        fetchData();

    },[categoryId, videoId]
)

  return (
    <div  className='recommended'>
        {apiData.map((item,index)=>{
            return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id || index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
                <h4>{item.snippet.title} </h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_convertor(item.statistics.viewCount)}views</p>
            </div>
        </Link>

            )
        }
    )}
        
        
        </div>
       
        
  )
}

export default Recommended
