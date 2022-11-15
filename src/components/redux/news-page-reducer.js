import { UPDATE_COMMENTS, TOGGLE_COMMENTS } from "./types"

const initState = {
    commentTree: {},
    comments: 'One second...',
    TIME_TO_UPDATE : 60,
}



export const NewsPageReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_COMMENTS: {
            return {
                ...state,
                commentTree: action.payload.tree,
                comments : action.payload.count,
            }
        }
        case TOGGLE_COMMENTS : {
            const { tree, node } = action.payload

            return {
                ...state,
                commentTree : {
                    parents : openComments(tree.parents, node)
                }
            }
        }

        default:
            return state
    }
}

const openComments = (comments, node) => {
    if (Array.isArray(comments)) {
        return comments.map(comment => {
            if (comment.id === node) {
                return {
                    ...comment,
                    isVisible: !comment.isVisible,
                }
            } else if (comment.kids) {
                return {
                    ...comment,
                    kids: openComments(comment.kids, node)
                }
            } else {
                return comment
            }
        });
    }
    return comments.id === node ? { ...comments, isVisible: true } : comments
}