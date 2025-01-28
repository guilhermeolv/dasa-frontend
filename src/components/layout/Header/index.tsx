import { Container } from './styles'
import { CircleRounded } from '@mui/icons-material'

export function Header() {
  return (
    <Container>
        <h3>DASA</h3>
        <p>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <CircleRounded 
              sx={{ 
                color: '#44b700', 
                fontSize: '8px', 
                marginRight: '6px' 
              }} 
            />
            Guilherme Oliveira
          </span>
        </p>
    </Container>
  )
}
