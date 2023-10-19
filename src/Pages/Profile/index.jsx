import { useDispatch, useSelector } from 'react-redux'
import { DeleteStoryTeamAction, GetStoryTeamAction } from '../../Services/action/action'
import { AddTeam } from '../AddTeam'
import './style.css'
import { useEffect, useState } from 'react'
import { Loading } from '../../Components/Loading'

export const Profile = () => {
    const [selectedBanner, setSelectedBanner] = useState(1)
    const [stories, setStories] = useState([])
    const [headerImages, setHeaderImages] = useState([
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
    ])
    const [secondImages, setSecondImages] = useState([
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
    ])
    const [brands, setBrands] = useState([
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
    ])
    const [categories, setCategories] = useState([
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
        {
            image: 'img.png',
        },
    ])

    const [openTeam, setOpenTeam] = useState(false)
    const { getStoryTeam } = useSelector((st) => st)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetStoryTeamAction())
    }, [])

    useEffect(() => {
        if (getStoryTeam.data) {
            setStories(getStoryTeam?.data)
        }
    }, [getStoryTeam])

    return (
        <div className='profile'>
            <AddTeam
                open={openTeam}
                setOpen={setOpenTeam}
            />
            <section className='storiesBlock'>
                <h1>قصص</h1>
                {!getStoryTeam.deletLoading ? <div className='stories'>
                    {stories?.length > 0 && stories?.map((e, i) => (
                        <div className='eachStory' key={i}>
                            <div className='eachStoryImg'>
                                <img alt='' src={`https://basrabackend.justcode.am/uploads/${e.photo}`} />
                            </div>
                            <span>{e?.name}</span>
                            <div className='deletStoryTeam' onClick={() => dispatch(DeleteStoryTeamAction({ story_id: e.id }))}>
                                x
                            </div>
                        </div>


                    ))}
                    <div className='eachStory'>
                        <img onClick={() => setOpenTeam(true)} alt='' src={require('../../assets/images/add.png')} />
                    </div>
                </div> :
                    <Loading />
                }

            </section>

            <section className='banners'>
                <h1>لافتات</h1>
                <div className='bannerButtons'>
                    <button className={selectedBanner === 1 ? 'selectedBanner' : 'banner'} onClick={() => setSelectedBanner(1)}>طلب</button>
                    <button className={selectedBanner === 2 ? 'selectedBanner' : 'banner'} onClick={() => setSelectedBanner(2)}>موقع إلكتروني</button>
                </div>
            </section>

            <section className='siteHeaderBlock'>
                <h1>رأس الموقع</h1>
                <div className='siteHeader'>
                    {headerImages?.length > 0 && headerImages?.map((e, i) => (
                        <img alt='' src={require(`../../assets/images/${e?.image}`)} key={i} />
                    ))}
                    <div className='siteHeader' style={{ width: '140px' }}>
                        <img alt='' src={require('../../assets/images/add.png')} className='addHeader' />
                    </div>
                </div>
            </section>

            <section className='siteHeaderBlock'>
                <h1>الكتلة الثانية</h1>
                <div className='siteHeader'>
                    {secondImages?.length > 0 && secondImages?.map((e, i) => (
                        <img alt='' src={require(`../../assets/images/${e?.image}`)} key={i} />
                    ))}
                </div>
            </section>

            <section className='siteHeaderBlock'>
                <h1>العلامات التجارية</h1>
                <div className='siteHeader'>
                    {brands?.length > 0 && brands?.map((e, i) => (
                        <img alt='' src={require(`../../assets/images/${e?.image}`)} key={i} />
                    ))}
                    <div className='siteHeader' style={{ width: '140px' }}>
                        <img alt='' src={require('../../assets/images/add.png')} className='addHeader' />
                    </div>
                </div>
            </section>

            <section className='siteHeaderBlock'>
                <h1>فئات</h1>
                <div className='siteHeader'>
                    {categories?.length > 0 && categories?.map((e, i) => (
                        <img alt='' src={require(`../../assets/images/${e?.image}`)} key={i} />
                    ))}
                    <div className='siteHeader' style={{ width: '140px' }}>
                        <img alt='' src={require('../../assets/images/add.png')} className='addHeader' />
                    </div>
                </div>
            </section>
        </div>
    )
}