import React from 'react'
import '../styles/posts.css'

const Post = (props) => {
    // let dateNow = Date.now()
    // let dateView = dateNow.getDate() + '-' + dateNow.getMonth() + '-' + dateNow.getFullYear()

    let postOwnerName = props.postsData.postOwnerName
    let postOwnerAvatar = props.postsData.postOwnerAvatar
    let postDate = props.postsData.postDate
    let postContentText = props.postsData.postContent.text


    let avatarStyle = {
        backgroundImage: `url(${postOwnerAvatar})`
    }
    return (
        <div className="post-block">
            <div className="post-text">{postContentText}</div>
            <div className="post-info">
                <div className="info-owner">
                    <div className="owner-avatar" style={avatarStyle}></div>
                    <div className="owner-name">
                        <a href="#">{postOwnerName}</a>
                        <span className="post-date">{postDate}</span>
                    </div>

                </div>
                <div className="post-stat">
                    -like-view-comments-
                    </div>
            </div>
        </div>
    )
}

const Posts = (props) => {

    let postsList = props.postsData.map((p) => <Post postsData={p}/>)
    return (
        <div>
           {postsList}
        </div>
    )
}

export default Posts