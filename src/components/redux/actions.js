import { UPDATE_COMMENTS, TOGGLE_COMMENTS} from "./types"

 export const updateComments = (tree, count) => {
    return {
        type : UPDATE_COMMENTS,
        payload : { tree, count }
    }
 }

 export const toggleComments = (tree, node) => {
    return {
        type : TOGGLE_COMMENTS,
        payload : { tree, node }
    }
 }