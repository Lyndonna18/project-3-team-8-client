import { useState, useEffect } from "react";
import messages from '../shared/AutoDismissAlert/messages'
// import Card from 'react-bootstrap/Card'
// import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllBlogs } from "../../api/blogs";

// const cardContainerStyle = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

// BlogIndex should show all blogs and display them

const BlogIndex = (props) => {
    console.log(props)
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props
    useEffect(() => {
        getAllBlogs()
            .then(res => setBlogs(res.data.blogs))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Pets',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                setError(true)
        })
    }, [])
    if (error) {
        return <p>Error!</p>
    }

    // If pets haven't been loaded yet, show a loading message
    if (!blogs) {
        return <LoadingScreen />
    } else if (blogs.length === 0) {
        return <p>No blogs yet. Better add some.</p>
    }

    // const blogCards = blogs.map(blog => (
    //     <Card style={{ width: '30%', margin: 5 }} key={blog.id}>
    //         <Card.Header>{blog.title}</Card.Header>
    //         <Card.Body>
    //             <Card.Text>
    //                 <p>{blog.body}</p>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // ))

    return (
        <div>Test</div>
        // <div style={cardContainerStyle}>
        //     {blogCards}
        // </div>
    )
}
export default BlogIndex