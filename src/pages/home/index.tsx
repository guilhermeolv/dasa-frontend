import { useNavigate } from 'react-router-dom'
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category'

export default function HomePage() {
    const navigate = useNavigate()

    const menuItems = [
        {
            title: 'Produtos',
            icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
            path: '/products',
            description: 'Gerenciar produtos'
        },
        {
            title: 'Categorias',
            icon: <CategoryIcon sx={{ fontSize: 40 }} />,
            path: '/categories',
            description: 'Gerenciar categorias'
        }
    ]

    return (
        <Container sx={{ mt: 10, position: 'relative', zIndex: 1000 }} maxWidth="lg">
            <Grid container spacing={10} justifyContent="center">
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.path}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 6
                                }
                            }}
                            onClick={() => navigate(item.path)}
                        >
                            <CardContent>
                                {item.icon}
                                <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                                    {item.title}
                                </Typography>
                                <Typography color="text.secondary" sx={{ mt: 1 }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
