import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

// Blog Post Data Type
interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
}

const blogPosts: BlogPost[] = [
    { id: 1, title: "React & TypeScript Best Practices", description: "Tips for writing better React apps with TypeScript.", image: "https://via.placeholder.com/300", author: "John Doe", date: "March 20, 2025" },
    { id: 2, title: "Framer Motion for Animations", description: "How to use Framer Motion in your React projects.", image: "https://via.placeholder.com/300", author: "Jane Smith", date: "March 18, 2025" },
    { id: 3, title: "MUI for Styling React Apps", description: "Build modern UIs with Material-UI.", image: "https://via.placeholder.com/300", author: "Alice Johnson", date: "March 15, 2025" },
];

const Blog = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5, fontFamily: "Poppins, sans-serif" }}>
            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Typography variant="h2" fontWeight="bold" textAlign="center">My Tech Blog</Typography>
                <Typography variant="h5" color="gray" textAlign="center">Sharing insights on web development</Typography>
            </motion.div>

            {/* Blog List */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {blogPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">{post.title}</Typography>
                                    <Typography variant="body2" color="gray">{post.date} · {post.author}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>{post.description}</Typography>
                                    <Button variant="contained" sx={{ mt: 2 }} component={Link} to={`/blog/${post.id}`}>
                                        Read More
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* About the Author */}
            <Box sx={{ mt: 6, textAlign: "center" }}>
                <Avatar src="https://via.placeholder.com/150" sx={{ width: 80, height: 80, mx: "auto" }} />
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>John Doe</Typography>
                <Typography variant="body1" color="gray">Full-Stack Developer & Blogger</Typography>
                <Typography variant="body2" sx={{ mt: 1, maxWidth: "600px", mx: "auto" }}>
                    Passionate about web development, JavaScript, and modern UI/UX design.
                </Typography>
            </Box>
        </Container>
    );
};

export default Blog;
