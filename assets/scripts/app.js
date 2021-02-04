const list = document.querySelector('.posts')
const singlePostTemplate =  document.getElementById('single-post')
const fetchPostsButton = document.getElementById('fetch-posts')
const form = document.querySelector('#new-post form') 



const addNewPostRequest = function(httpMethod, url, data) {
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()
    //     xhr.open(httpMethod, url)
    //     xhr.body = data

    //       xhr.send(xhr.body)

    //       xhr.onload = function() {
    //           resolve(xhr.response)
    //       }
    // })
    
    // return promise

    return fetch(url, {
        method: httpMethod,
        body: data    
    })
}

const addNewPost = function(title, body, userId) {

    const data = JSON.stringify({
        title,
        body,
        userId
      })

    addNewPostRequest('POST','https://jsonplaceholder.typicode.com/posts', data).then(data => {
        console.log(data)
    })    
}


const fetchPosts = () => {
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()
    //     xhr.open('GET','https://jsonplaceholder.typicode.com/posts')

    //     xhr.send()

    //     xhr.onload = function() {
    //         const postLIst = resolve(JSON.parse(xhr.response)) // we need to parse json response to js types
    //         return postLIst
    //     }
    // })

    // return promise

    return fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
        return response.json()
    })
}

async function displayPosts()  {
    
    const postList = await fetchPosts()

    postList.forEach(element => {                       
        const postElement = document.importNode(singlePostTemplate.content, true)
        postElement.querySelector('h2').textContent = element.title.toUpperCase()
        postElement.querySelector('p').textContent = element.body
        postElement.querySelector('li').id = element.id
        list.append(postElement)
        });
    
}

fetchPostsButton.addEventListener('click', displayPosts)
form.addEventListener('submit', event => {
    event.preventDefault()
    const enteredTitle = event.currentTarget.querySelector('#title').value
    const enteredContent = event.currentTarget.querySelector('#content').value
    const userId = 1

    addNewPost(enteredTitle, enteredContent, userId)
})

list.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id
        console.log(postId)
        // TO DO: Implement the actual DELETE http request
    }
})

