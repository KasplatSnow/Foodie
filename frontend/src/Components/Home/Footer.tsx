import { Box, Link, Typography } from '@mui/material'
import { Facebook, Instagram } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#F6F6F6',
        padding: '40px 20px',
        display: 'flex', // Flexbox layout
        justifyContent: 'center', // Center the columns group
        alignItems: 'start', // Align items to the top
        flexWrap: 'wrap', // Wrap columns on small screens
        gap: '24px', // Space between columns
        position: 'relative', // For custom positioning
      }}
    >
      {/* Group of "About Us", "Contact Info", and "Quick Links" */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // Align these columns in a row
          gap: '48px', // Gap between each column inside this group
        }}
      >
        {/* Column 1 - Quick Links */}
        <Box sx={{ flex: '1', minWidth: '150px' }}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link
            href="/"
            sx={{
              display: 'block',
              color: 'text.primary',
              textDecoration: 'none',
              mb: 1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Home
          </Link>
          <Link
            href="/business"
            sx={{
              display: 'block',
              color: 'text.primary',
              textDecoration: 'none',
              mb: 1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Business
          </Link>
          <Link
            href="/write-review"
            sx={{
              display: 'block',
              color: 'text.primary',
              textDecoration: 'none',
              mb: 1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Write a Review
          </Link>
          <Link
            href="/contact-us"
            sx={{
              display: 'block',
              color: 'text.primary',
              textDecoration: 'none',
              mb: 1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Contact Us
          </Link>
        </Box>
        {/* Column 2 - Contact Info */}
        <Box sx={{ flex: '1', minWidth: '200px' }}>
          <Typography variant="h6" gutterBottom>
            Contact Info
          </Typography>
          <Typography>Phone: +123 456 7890</Typography>
          <Typography>Email: contact@foodie.com</Typography>
          <Typography>Address: 123 San Jose State, CA 95116</Typography>
        </Box>
        {/* Column 3 - Follow Us */}
        <Box sx={{ flex: '1', minWidth: '200px' }}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Facebook />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Instagram />
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: '0.5',
          minWidth: '100px',
          textAlign: 'center',
          marginLeft: '100px',
        }}
      >
        <Box
          sx={{
            marginTop: '16px',
            textAlign: 'center',
          }}
        >
          <img
            src="https://www.pngkey.com/png/detail/382-3824883_fit-foodie-finds.png"
            alt="Social Media Logo"
            style={{
              width: '300px',
              height: '100px',

              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
