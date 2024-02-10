import create from "./create.user"
import list from "./get.user.list"
import get from "./get.user.by.id"
import authUser from './get.authenticated.user'
import updateImage from './update.user.image'
import getImage from './get.user.image'
import timeLineActions from './get.timeline.actions.by.user'
import getUserAttachments from './get.user.attachments'
import createUserAttachment from './create.user.attachment'
import removeAttachment from './remove.user.attachment'
import updateUserByAdmin from './update.user.by.admin'
import updateUser from './update.user'

export const createUserController = create
export const listUsersController = list
export const getUserByIdController = get
export const getAuthenticatedUser = authUser
export const updateUserImageController = updateImage
export const getUserImageController = getImage
export const getTimeLineActionsPerUserController = timeLineActions
export const getUserAttachmentsController = getUserAttachments
export const createUserAttachmentController = createUserAttachment
export const removeUserAttachmentController = removeAttachment
export const updateUserByAdminController = updateUserByAdmin
export const updateUserController = updateUser