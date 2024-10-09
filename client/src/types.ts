
// User type
export type userType = {
    active: boolean,
    admin: boolean,
    dateJoined: Date,
    email: string,
    id: string,
    image: string,
    name: string,
    __v: number,
    _id: string
} | null


export type promptType = {
    version: number,
    madeBy: userType,
    question: string,
    reply: string,
    _id: string
}[]

export type chatType = {
    owner: userType,
    name: string,
    dateCreated: Date,
    allPrompts: promptType[] | null,
    _id: string
}

export type projectType = {
    owner: userType,
    name: string,
    dateCreated: Date,
    chats: chatType[],
    _id: string,
    members: {
        user: userType,
        status: 'Owner' | 'Active' | 'Invite Sent'
    }[],
    inviteLink: string,
}