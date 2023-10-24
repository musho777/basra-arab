import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import { useEffect, useState } from 'react'
import { GetMyChatRoom } from '../../Services/action/action'
import { Loading } from '../Loading'

export const ChatLeft = ({ currentMember, setCurrentMember }) => {
    const [search, setSearch] = useState('')
    const { chatRoom } = useSelector((st) => st)
    const [chatMembers, setChatMembers] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetMyChatRoom(search))
    }, [])
    useEffect(() => {
        setChatMembers(chatRoom.data)
    }, [chatRoom])
    if (chatRoom.loading) {
        return <Loading />
    }
    return (
        <section className='chatLeft'>
            {chatMembers?.length > 0
                ? chatMembers?.map((e, i) => {
                    let date = new Date(e.created_at);
                    let today = new Date()
                    let day = date.getDate()
                    let mount = date.getMonth()
                    let houre = date.getHours()
                    let minute = date.getMinutes()
                    let Datee = ''
                    if (day < 10) {
                        day = `0${day}`
                    }
                    if (mount < 10) {
                        mount = `0${mount}`
                    }
                    if (houre < 10) {
                        houre = `0${houre}`
                    }
                    if (minute < 10) {
                        minute = `0${minute}`
                    }
                    if (date.getDate() == today.getDate()) {
                        Datee = `${houre}:${minute}`
                    }
                    else {
                        Datee = `${day}.${mount}`
                    }
                    let from = e.sender_id == 1
                    return <div className='eachChatMember' key={i} onClick={() => setCurrentMember(e)} style={currentMember?.id === e?.id ? { background: '#d9d9d9' } : {}}>
                        <div className='eachMemberLeft'>
                            {e?.sender?.avatar
                                ? <img alt='' src={`https://basrabackend.justcode.am/uploads/${e?.sender?.avatar}`} />
                                : <div className='noImageChat'>{e?.name?.split('')[0]}</div>
                            }
                            <div className='memberName'>
                                <p>{e?.sender?.name?.length > 20 ? e.sender?.name?.slice(0, 20) + '...' : e?.sender?.name}</p>
                                {e?.groupChat
                                    ? e?.lastMessage?.image
                                        ? <h6>{from}: <img alt='' src={require(`../../assets/images/${e?.lastMessage?.image}`)} /> <span className='lastMessage'>{e?.lastMessage?.message?.length > 35 ? e?.lastMessage?.message.slice(0, 35) + '...' : e?.lastMessage?.message}</span></h6>
                                        : <h6>{from ? `${from}:` : ''} <span className='lastMessage'>{e?.lastMessage?.message ? e?.lastMessage?.message?.length > 25 ? e?.lastMessage?.message.slice(0, 25) + '...' : e?.lastMessage?.message : "Channel Created"}</span></h6>
                                    : !from
                                        ? <span className='lastMessage'>{e?.message?.length > 35 ? e?.message.slice(0, 35) + '...' : e?.message}</span>
                                        : <span className='lastMessage'>You: {e?.message?.length > 35 ? e?.message.slice(0, 35) + '...' : e?.message}</span>
                                }
                            </div>
                        </div>
                        <div className='eachMemberRight'>
                            <span>{Datee}</span>
                            {e?.message_sum > 0
                                ? <div className='messageCount'>{e?.message_sum}</div>
                                : <div />
                            }
                        </div>
                    </div>
                })
                : <span>No chat members</span>
            }
        </section>
    )
}