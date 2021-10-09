import React from 'react';
import { useQuery, useMutation } from 'react-query'


async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, error, isError } = useQuery(['postComments', post.id], () => fetchComments(post.id), {staleTime: 20000}); 

  const deleteMutation = useMutation((postId) => deletePost(postId))
  const updateMutation = useMutation((postId) => updatePost(postId))

  if(isLoading) {
    return <p>Loading...</p>
  }
 
  if (isError) {
   return <span>Error: {error.message}</span>
 }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.error && <p style={{color: 'red'}}>Error deleting the post</p>}
      {deleteMutation.isLoading && <p style={{color: 'purple'}}>Deleting the post</p>}
      {deleteMutation.isSuccess && <p style={{color: 'green'}}>Post has (not) been deleted</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
