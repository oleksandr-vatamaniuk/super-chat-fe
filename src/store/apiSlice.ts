import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReAuth from '@store/baseQueryWithReAuth.ts'

const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['Chats', 'User'],
	endpoints: (_) => ({}),
})

export default apiSlice
