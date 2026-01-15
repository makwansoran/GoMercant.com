// Temporary script to create a test account
// Run with: tsx scripts/create-test-account.ts

const response = await fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'makwansoran@outlook.com',
    password: '111',
  }),
})

const data = await response.json()

if (response.ok) {
  console.log('✅ Account created successfully!')
  console.log('User:', JSON.stringify(data.user, null, 2))
} else {
  console.error('❌ Failed to create account:', data.error)
  console.log('Response:', data)
}
