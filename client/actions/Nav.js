/**
 * Created by wyf on 2016/10/29.
 */
import {FILTER_BLOG} from '../constants/NavActions';

export function filterBlog(blogType){
    return {
        type:FILTER_BLOG,
        blogType
    }
}