export async function getServerSideProps () {
    const res = await fetch('http://localhost:8000/posts')
    const data = await res.json()
    return {    
        props: {
            user,data
        }
    }
}

export default function Post({ user, data }) {
    return (
        <div>
            <h1>Post link</h1>
            <ul>
                {data.map(post => (
                   <li key={post.id}>{post.title}  </li>
                ))}
            </ul>
            <h1>user link</h1>
            <ul>
                {user.map(user => (
                   <li key={user.id}>{user.name}  </li>
                ))}
            </ul>
           
        </div>
    )
}