import axios from "axios";
export const getPostsRequest = async() => await axios.get('http://localhost:5000/posts')
export const createPostRequest = async(post)=> await axios.post("http://localhost:5000/posts",post)