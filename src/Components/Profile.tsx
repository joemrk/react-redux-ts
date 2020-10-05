import React, { useEffect, useState } from 'react'
import '../styles/profile.css';
import TextWriter from './TextWriter';
import Posts from './Posts';
import { /*actionDraftPost, actionAddPost,*/ GetProfile, GetProfileStatus, UpdateProfileStatus, changeProfilePhoto, ChangeProfileInfo } from '../redux/profileReducer';
import { connect } from 'react-redux';
import Preloader from './Common/Preloader/Preloader';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { AppStateType } from '../redux/reduxStore';
import { ProfileType } from '../api/profileApi';


type ProfileComponentType = {
    profileData: ProfileType | null
    profileStatus: string | null
    isAuth: boolean
    id: number | null
    match: any

    GetProfile: (id: number) => void
    GetProfileStatus: (id: number) => void
    UpdateProfileStatus: (status: string | null) => void
    changeProfilePhoto: (file: any) => void
    ChangeProfileInfo: (profile: ProfileType) => void
}
const Profile: React.FC<ProfileComponentType> = (props) => {

    useEffect(()=>{
        let propsProfileId = props.match.params.profileId
        let profileId = (propsProfileId) ? propsProfileId : (props.isAuth) && props.id        
        props.GetProfile(profileId)
        props.GetProfileStatus(profileId)
    },[props.GetProfile, props.GetProfileStatus])


    const [updateProfileMod, setUpdateProfileMod] = useState(false)

    if (!props.profileData) return <Preloader show={true} />
    const onFileSelected = (e: any) => {
        if (e.target.files.length) {
            props.changeProfilePhoto(e.target.files[0])
        }
    }
    const updateProfileInfo = (data: ProfileType) => {
        props.ChangeProfileInfo(data)
        setUpdateProfileMod(false)
    }
    return (
        <div className="profile-page ">
            <div className="profile page-block">
                <div className="profile-avatar">
                    <img src={props.profileData.photos.large || '/static/profiles/default_user.png'} alt="" />
                    {!props.match.params.profileId && <input style={{ width: '200px' }} type={"file"} onChange={(e) => { onFileSelected(e) }} />}
                </div>
                {!updateProfileMod ? <ProfileInfo
                    profile={props.profileData}
                    profileStatus={props.profileStatus}
                    UpdateProfileStatus={props.UpdateProfileStatus} />
                    : <UpdateProfileInfoForm
                        profile={props.profileData}
                        // profileStatus={props.profileStatus}
                        saveProfileInfo={updateProfileInfo} />}

                <span onClick={() => { setUpdateProfileMod(!updateProfileMod) }} className="update-profile-bnt btn">&#9881;</span>
            </div>
        </div>

    )
}
type ProfileContactType = {
    title: string
    value: string
}
const ProfileContact: React.FC<ProfileContactType> = ({ title, value }) => {
    return (
        <div key={title} className="profile-contact-item">
            <a className="profile-contact-link" href={value}>{title}</a>
        </div>
    )
}
type UpdateProfileContactType = {
    title: string
    value: string | null
    handler: (e: any) => void
}
const UpdateProfileContact: React.FC<UpdateProfileContactType> = ({ title, value, handler }) => {
    return (
        <div key={title} className="update-profile-contact-item">
            <b>{title}: </b><input type="text" onChange={handler} name={title} value={value || ''} />
        </div>
    )
}

type UpdateProfileInfoFormType = {
    profile:ProfileType
    saveProfileInfo: (form: ProfileType) => void
}
const UpdateProfileInfoForm: React.FC<UpdateProfileInfoFormType> = ({ profile, saveProfileInfo }) => {
    const [updateForm, setUpdateForm] = useState(profile)

    const contactUpdateHandler = (e: any) => {
        setUpdateForm({ ...updateForm, contacts: { ...updateForm.contacts, [e.target.name]: e.target.value } })
    }

    const mainInfoUpdateHandler = (e: any) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value })
    }

    return (
        <div className="update-profile-info">
            <div className="update-profile-form">
                <div className="profile-info-left">
                    <div className="profile-info-name">
                        <input type="text" name={"fullName"} onChange={mainInfoUpdateHandler} value={updateForm.fullName || ''} />
                    </div>
                    <div className="profile-info-boi">
                        <input type="text" placeholder={"aboutMe"} name={"aboutMe"} onChange={mainInfoUpdateHandler} value={updateForm.aboutMe || ''} />
                    </div>
                    <br />
                    <div className="profile-about-looking-job">
                        <b>Looking for a job? </b>
                        <input type="checkbox" checked={updateForm.lookingForAJob} onChange={() => { setUpdateForm({ ...updateForm, lookingForAJob: !updateForm.lookingForAJob }) }} /> <br /><br />
                        <b>Professionals skills: </b><br />
                        <textarea name={"lookingForAJobDescription"} value={updateForm.lookingForAJobDescription || ''} onChange={mainInfoUpdateHandler} ></textarea>
                    </div>
                </div>

                <div className="profile-info-right">

                    <div className="profile-contacts">
                        <p><b>Contacts: </b></p>
                        <br />
                        {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(c => {
                            return <UpdateProfileContact key={c} title={c} value={updateForm.contacts[c]} handler={contactUpdateHandler} />
                        })}
                    </div>
                </div>
            </div>
            <span id="saveProfileChanges" onClick={() => { saveProfileInfo(updateForm) }}>Save changes</span>
        </div>
    )
}

type ProfileInfoType = {
    profile: ProfileType
    profileStatus: string | null
    UpdateProfileStatus: (str: string | null) => void
}
const ProfileInfo: React.FC<ProfileInfoType> = ({ profile, profileStatus, UpdateProfileStatus }) => {
    return (
        <div className="profile-info">
            <div className="profile-info-left">
                <div className="profile-info-name">
                    <h2>{profile.fullName}</h2>
                </div>
                <ProfileStatus profileStatusText={profileStatus} updateStatus={UpdateProfileStatus} />
                <div className="profile-info-boi">
                    <p>{profile.aboutMe}</p>
                </div>
            </div>

            <div className="profile-info-right">
                <div className="profile-about-looking-job">
                    <b>Looking for a job: </b>
                    {profile.lookingForAJob ?
                        <span>
                            <span>yes</span> <br />
                            <span>My professionals skills: </span>
                            <p>{profile.lookingForAJobDescription}</p>
                        </span>
                        : <span>no</span>
                    }
                </div><br />
                <div className="profile-contacts">
                    <p><b>Contacts: </b></p>
                    {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).filter(key => {
                        if (profile.contacts[key] !== null) return key
                    }).map(c => {
                        return <ProfileContact key={c} title={c} value={profile.contacts[c] || ''} />
                    })}
                </div>
            </div>

        </div>
    )
}

type ProfileStatusType = {
    profileStatusText: string | null
    updateStatus: (str: string | null) => void
}
const ProfileStatus: React.FC<ProfileStatusType> = ({ profileStatusText, updateStatus }) => {
    let [ediMode, setEditMode] = useState(false)
    let [statusText, setStatusText] = useState(profileStatusText)

    useEffect(() => {
        setStatusText(profileStatusText)
    }, [profileStatusText])

    const saveStatusText = () => {
        setEditMode(false)
        updateStatus(statusText)
    }
    return (
        <>
            {!ediMode &&
                <div className='profile-status'>
                    <p style={{ fontStyle: "italic" }} onDoubleClick={() => { setEditMode(true) }}>{statusText || '---'}</p>
                </div>
            }
            {ediMode &&
                <div className='profile-status'>
                    <input autoFocus={true} onChange={(e) => { setStatusText(e.target.value) }} onBlur={saveStatusText} value={statusText || ''} type="text" className="change-status-input" />
                </div>
            }
        </>
    )
}

type OwnProps = {
}
type MstpType = {
    profileData: ProfileType | null
    profileStatus: string | null
    isAuth: boolean | undefined
    id: number | null | undefined
    // match: any

}

type MdtpType = {
    GetProfile: (id: number) => void
    GetProfileStatus: (id: number) => void
    UpdateProfileStatus: (status: string | null) => void
    changeProfilePhoto: (file: any) => void
    ChangeProfileInfo: (profile: ProfileType) => void
}
const mapStateToProps = (state: AppStateType) => ({
    profileData: state.profileData.currentProfile,
    profileStatus: state.profileData.profileStatus,
    isAuth: state.auth.isAuth,
    id: state.auth.id,
})



const mapDispatchToProps = {
    GetProfile,
    GetProfileStatus,
    UpdateProfileStatus,
    changeProfilePhoto,
    ChangeProfileInfo
}

export default compose(
    connect<MstpType,MdtpType,OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(Profile)



