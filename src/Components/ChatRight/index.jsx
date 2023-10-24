import './style.css'
import { useEffect, useRef, useState } from 'react'
import { Smile, Send, CheckMarkWhite, CheckMarkBlack } from '../Svg'
import { useDispatch, useSelector } from 'react-redux'
import { GetSinglPageChatRoom, NewMsgAction } from '../../Services/action/action'
import { Loading } from '../Loading'

export const ChatRight = ({ currentMember }) => {
    const { getSinglChat } = useSelector((st) => st)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState('')
    const { addMsg } = useSelector((st) => st)
    const containerRef = useRef(null);
    useEffect(() => {
        const scrollableDiv = containerRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = 810
        }
    }, [messages]);
    useEffect(() => {
        let item = []
        let data = getSinglChat?.data?.data
        let reversData = []
        if (data?.length) {
            reversData = data.reverse()
        }
        reversData && reversData.map((elm, i) => {
            let from = ''
            if (elm.sender_id == 1) {
                from = 'me'
            }
            else {
                from = 'user'
            }
            let date = new Date(elm.created_at);
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
            item.push({
                from: from,
                message: elm.message,
                read: true,
                time: Datee
            })
        })
        setMessages(item)
    }, [getSinglChat])

    useEffect(() => {
        if (currentMember?.sender_id) {
            dispatch(GetSinglPageChatRoom({ receiver_id: currentMember.sender_id }))
        }
    }, [currentMember])


    useEffect(() => {
        console.log(addMsg.data)
        if (Object.keys(addMsg.data).length) {
            let item = [...messages]
            let elm = addMsg.data
            let date = new Date(elm.created_at);
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
            let from = ''
            if (elm.sender_id == 1) {
                from = 'me'
            }
            else {
                from = 'user'
            }
            item.push({
                from: from,
                message: elm.message,
                read: true,
                time: Datee
            })
            setMessages(item)
        }
    }, [addMsg])


    const sendMsg = () => {
        if (msg) {
            dispatch(NewMsgAction({ message: msg, receiver_id: currentMember.sender_id }))
        }
    }

    return (
        <div className='chatRight'>
            {Object.keys(currentMember)?.length
                ? <section className='chatRight'>
                    <div className='chatTop' >
                        {currentMember?.sender?.avatar
                            ? <img alt='' src={`https://basrabackend.justcode.am/uploads/${currentMember?.sender?.avatar}`} />
                            : <div className='noImageChat'>{currentMember.sender?.name?.split('')[0]}</div>
                        }
                        <span>{currentMember?.sender?.name}</span>
                    </div>

                    {getSinglChat.loading ?
                        <Loading /> :
                        <div ref={containerRef} className='chatMessages'>
                            {messages?.length > 0
                                ? messages?.map((e, i) => (
                                    <div className={e?.from === 'me' ? 'eachMyMessage' : 'eachMessage'} key={i}>
                                        <div className={e?.from === 'me' ? 'myMessage' : 'message'} >
                                            <p>{e?.message}</p>
                                            <div className='messageTime'>
                                                <span>{e?.time}</span>
                                                {e?.from === 'me' && e?.read
                                                    ? <CheckMarkWhite />
                                                    : e?.from !== 'me' && e?.read
                                                        ? <CheckMarkBlack />
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : <span className='noChatMember'>No messages</span>
                            }
                        </div>
                    }

                    <div className='chatBottom'>
                        <div className='chatBottomBg'>
                            <div><Smile /></div>
                            <textarea
                                placeholder='Message'
                                onChange={(e) => setMsg(e.target.value)}
                            />
                            <button onClick={() => sendMsg()}><Send /></button>
                        </div>
                    </div>
                </section>
                : <span className='noChatMember'>Select a member to chat</span>
            }
        </div >
    )
}