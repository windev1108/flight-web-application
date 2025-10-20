import NotFoundImage from '@/assets/images/not-found.png';
import { ROUTES } from '@/lib/routes';
import { Container, Typography } from '@mui/material';


export default function NotFoundPage() {
    return (
        <Container sx={{ display: 'flex', height: '100%', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
                style={{
                    marginBottom: '32px',
                    maxHeight: '60px',
                    objectFit: 'contain',
                }}
                src={NotFoundImage}
                alt='Page not found'
            />
            <Typography component='h1' sx={{ mb: 12, fontSize: 32 }}>Page Not Found</Typography>
            <Typography component='p' sx={{ marginBottom: 12, textAlign: 'center,' }}>
                We couldn't find the page you're looking for.
                <br /> It might have been moved, deleted, or the URL might be incorrect.
            </Typography>
            <Typography component='p' sx={{ textAlign: 'center' }}>
                Please go back to{' '}
                <a href={ROUTES.HOME}>
                    the homepage
                </a>
            </Typography>
        </Container>
    );
}
