import app from '@config/app'

const { PORT } = process.env
app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`⚡️[server]: Server is running on port ${PORT || 3000}`)
})
