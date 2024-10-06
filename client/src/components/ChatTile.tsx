import { chatType } from "@/types"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { renameChat, setChats } from "@/features/chatsSlice"
import { RootState } from "@/app/store"

const ChatTile = ({ item, userId }: { item: chatType, userId: string | undefined }) => {
    const [chatName, setChatName] = useState(item.name)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allChats = useSelector((state: RootState) => state.chats.allChats)


    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        dispatch(setChats(allChats.filter((chat) => chat._id != item._id)))
        navigate(`/${userId}`)
    }


    const handleSubmit = (e: any) => {
        if (e.keyCode == 13) {
            let newName = e.target.value == "" ? "Untitled" : e.target.value
            setChatName(newName)
            setEditMode(false)

            let chatIdx = allChats.findIndex(chat => chat._id == item._id)
            dispatch(renameChat({ idx: chatIdx, newName: newName }))
        }
    }

    return (
        <NavLink
            to={`/${userId}/${item._id}`}
            className={({ isActive }) => isActive ? "flex justify-between items-center p-3 rounded-lg bg-accent" : "flex justify-between items-center p-3 rounded-lg"}
        >
            {!editMode ?
                <h3 onDoubleClick={() => setEditMode(true)}> {chatName} </h3> :
                <Input type="text" className="text-xs p-0 py-0 h-fit" onKeyDown={(e) => handleSubmit(e)} />
            }

            <button
                className="text-lg"
                onClick={e => handleDelete(e)}
            >
                <MdDelete />
            </button>
        </NavLink>
    )
}

export default ChatTile