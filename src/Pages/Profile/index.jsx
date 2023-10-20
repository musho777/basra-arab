import { useDispatch, useSelector } from 'react-redux'
import { DeleteStoryTeamAction, GetSliderAction, GetStoryTeamAction } from '../../Services/action/action'
import { AddTeam } from '../AddTeam'
import './style.css'
import { useEffect, useState } from 'react'
import { Loading } from '../../Components/Loading'
import { EditOrder } from '../EditOrder'
import { AddBanner } from '../AddBanner'

export const Profile = () => {
    const [selectedBanner, setSelectedBanner] = useState(1)
    const [stories, setStories] = useState([])
    const [openEditORder, setOpenEditORder] = useState(false)
    const [activeId, setActiveId] = useState()
    const [openAddBanner, setOpenAddBanner] = useState(false)
    const [banerType, setBanerType] = useState('first')
    const { getSlider } = useSelector((st) => st)

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
    const [secondImages, setSecondImages] = useState([])
    const [brands, setBrands] = useState([])
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
            setBrands(getStoryTeam.lastSlider)
        }
    }, [getStoryTeam])

    useEffect(() => {
        dispatch(GetSliderAction("first"))
        dispatch(GetSliderAction("last"))
    }, [])

    console.log(getSlider, 'getSlider')

    useEffect(() => {
        setSecondImages(getSlider.data)
        setBrands(getSlider.lastSlider)
    }, [getSlider])
    console.log(brands?.length)
    return (
        <div className='profile'>
            <AddTeam
                open={openTeam}
                setOpen={setOpenTeam}
            />
            {openEditORder && <EditOrder
                open={openEditORder}
                setOpen={setOpenEditORder}
                id={activeId}
            />}
            {openAddBanner &&
                <AddBanner
                    open={openAddBanner}
                    setOpen={setOpenAddBanner}
                    type={banerType}
                />
            }
            <section className='storiesBlock'>
                <h1>قصص</h1>
                {!getStoryTeam.deletLoading ? <div className='stories'>
                    {stories?.length > 0 && stories?.map((e, i) => (
                        <div onClick={() => {
                            setActiveId(e.id)
                            setOpenEditORder(true)
                        }} className='eachStory' key={i}>
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
                    {secondImages?.length > 0 && secondImages?.map((e, i) => {
                        console.log(e.type)
                        if (e.type == 'mp4') {
                            return <video width="300" height="200" controls>
                                <source src={`https://basrabackend.justcode.am/uploads/${e?.file}`} type="video/mp4" />
                            </video>
                        }
                        return <img alt='' src={`https://basrabackend.justcode.am/uploads/${e?.file}`} key={i} />
                    })}
                    <div onClick={() => {
                        setOpenAddBanner(true)
                        setBanerType('first')
                    }} className='siteHeader' style={{ width: '140px' }}>
                        <img alt='' src={require('../../assets/images/add.png')} className='addHeader' />
                    </div>
                </div>
            </section>

            <section className='siteHeaderBlock'>
                <h1>العلامات التجارية</h1>
                <div className='siteHeader'>
                    {brands?.length > 0 && brands?.map((e, i) => {
                        if (e.type == 'mp4') {
                            return <video width="300" height="200" controls>
                                <source src={`https://basrabackend.justcode.am/uploads/${e?.file}`} type="video/mp4" />
                            </video>
                        }
                        return <img alt='' src={`https://basrabackend.justcode.am/uploads/${e?.file}`} key={i} />
                    })}
                    <div onClick={() => {
                        setOpenAddBanner(true)
                        setBanerType('last')
                    }} className='siteHeader' style={{ width: '140px' }}>
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