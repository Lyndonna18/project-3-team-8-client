import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'

import { Container, Card, Button } from "react-bootstrap"

import LoadingScreen from "../shared/LoadingScreen"
// import this down here vv updateBlog,
import { getOneBlog, removeBlog } from "../../api/blogs"
import messages from '../shared/AutoDismissAlert/messages'

const containerStyle = {
    display: 'flex',
    // flexFlow: 'row wrap'
}

const ShowBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const [updated, setUpdate] = useState(false)
    // ^^deconstructuring to get the id value from our route parameters

    const { id } = useParams()
    const navigate = useNavigate()


    const { user, msgAlert } = props


    useEffect(() => {
        getOneBlog(id)
            .then(res => setBlog(res.data.blog))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Blogs',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                navigate('/')
                //navigate back to the homepage if there's an error
            })
    }, [updated])

    const removeTheBlog = () => {
        removeBlog(user, blog.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBlogSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing blog',
                    message: messages.removeBlogFailure,
                    variant: 'danger'
                })
            })
    }

    if (!blog) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header><h2
                        style={{textAlign: 'center'}}>{blog.title}</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>{blog.body}</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            // this makes it so only the user who owns the post can delete it
                            // we can put the edit modal (or button here) it just depends if we build an
                            // edit function
                            blog.owner && user && blog.owner._id === user._id
                            ?
                            <>
                                {/* edit modal here */}

                                <Button onClick={() => removeTheBlog()}
                                    className="m-2"
                                    variant="outline-danger"
                                >
                                    Delete this post
                                </Button>
                            </>
                            :
                            null
                        }          
                        {/* <small>add likes and timestamps here maybe</small> */}
                        {/* tested styling here */}
                        {/* <div style={containerStyle}> */}
                        <p style={{textAlign: 'right'}}>{blog.commentsAvail}</p>
                        <Button 
                            onClick={() => navigate('/')}
                                className="m-2 col-1"
                                variant="outline-secondary"
                                style={{
                                    float: 'left',
                                }}
                            >
                                 Go back
                        </Button>
                        {/* </div> */}
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}
export default ShowBlog