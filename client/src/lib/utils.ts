import { chatType, promptType, userType } from "@/types"
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
      [createNewPrompt({ version: 1, madeBy: owner, question: question, reply: "", _id: "1" })] : [],
    dateCreated: new Date(),
    _id
  }
}


export const createNewPrompt = ({
  version,
  madeBy,
  question,
  reply,
  _id
}: {
  version: number,
  madeBy: userType,
  question: string,
  reply: string,
  _id: string
}): promptType => {
  return [
    { version, madeBy, question, reply, _id }
  ]
}