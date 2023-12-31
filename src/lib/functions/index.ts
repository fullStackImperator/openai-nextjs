export async function generatePost(postPrompt: PostPrompt) {
  return await fetch('/api/posts/generatePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postPrompt),
  })
}

export async function getPosts() {
  const res = await fetch("/api/posts/getPosts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  })
  const data = await res.json()
  return data.posts
  
}


export async function deletePost(_id:string) {
  const res = await fetch("/api/posts/deletePost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({_id})
  })
  const data = await res.json()
  return data
  
}