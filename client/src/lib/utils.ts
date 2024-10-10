import { chatType, projectType, promptType, userType } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const createNewChat = ({
  owner,
  name,
  question,
  _id
}: {
  owner: userType,
  name: string,
  question: string | null,
  _id: string
}): chatType => {
  return {
    owner,
    name,
    allPrompts: (question && question.length) ?
      [createNewPrompt({madeBy: owner, question: question, reply: "", _id: "1" })] : [],
    dateCreated: new Date(),
    _id
  }
}


export const createNewPrompt = ({
  madeBy,
  question,
  reply,
  _id
}: {
  madeBy: userType,
  question: string,
  reply: string,
  _id: string
}): promptType => {
  return {  madeBy, question, reply, _id }
}


export const createNewProject = ({
  owner,
  name,
  _id,
}: {
  owner: userType,
  name: string,
  _id: string
}): projectType => {
  return({
    owner,
    name,
    dateCreated: new Date(),
    chats: [],
    _id,
    members: [{
      user: owner,
      status: "Owner"
    }],
    inviteLink: `http://localhost:5173/${owner?._id}/project/${_id}`
  })
}