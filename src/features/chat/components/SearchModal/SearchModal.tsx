import { Box, HStack, Input, Stack, Text, Highlight, Skeleton, Separator } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { GoInbox } from 'react-icons/go'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import useDebounce from '@hooks/useDebounce.ts'
import { useFindMessagesMutation, useGetChatsQuery } from '@features/chat/chatApi.ts'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'
import { useSelector } from 'react-redux'
import { selectUser } from '@features/user/userSlice.ts'
import { extractTime } from '@utils/exactTime.ts'
import useIsOffline from '@hooks/useIsOffline.ts'
import { useNavigate } from 'react-router-dom'
import { IUser, MessageResponse } from '@types'

const SearchModal = () => {
	const [open, setOpen] = useState(false)
	const [searchText, setSearchText] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const user = useSelector(selectUser) || {}
	const isOffline = useIsOffline()
	const navigate = useNavigate()

	const { participants } = useGetChatsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			participants: data?.map((item) => item.participant) ?? [],
		}),
	})

	const [findMessages, { isLoading, data: messages = [] }] = useFindMessagesMutation()

	const debouncedSearchText = useDebounce(searchText, 500)

	const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value.trim())
	}

	useEffect(() => {
		if (debouncedSearchText.length > 0) {
			findMessages(debouncedSearchText)
		}
	}, [debouncedSearchText, findMessages])

	const renderEmptyState = () => (
		<Stack
			p={8}
			alignItems='center'
			gap={4}
		>
			<Box color='fg.muted'>
				<GoInbox size={32} />
			</Box>
			<Text color='fg.muted'>
				No results found for{' '}
				<Box
					fontWeight='semibold'
					as='span'
				>
					{searchText}
				</Box>
			</Text>
		</Stack>
	)

	const renderLoadingSkeleton = () => (
		<Stack gap={2}>
			{Array(3)
				.fill(null)
				.map((_, index) => (
					<HStack
						key={index}
						px={2}
						py={2.5}
					>
						<SkeletonCircle size='11' />
						<Stack
							w='full'
							gap={1}
						>
							<Skeleton
								height='5'
								width='25%'
							/>
							<Skeleton
								height='5'
								width='80%'
							/>
						</Stack>
						{index < 2 && <Separator borderColor='brand.grey.100' />}
					</HStack>
				))}
		</Stack>
	)

	const renderResults = () => {
		return messages.map(({ _id, message, senderId, receiverId, createdAt }: MessageResponse, index: number) => {
			// @ts-ignore
			const name = senderId === user._id ? 'You' : participants.find((item: IUser) => item._id === senderId).name
			// @ts-ignore
			const avatar =
				senderId === user._id ? user.avatar : participants.find((item: IUser) => item._id === senderId).avatar || ''

			const clickHandler = () => {
				setOpen(false)
				// @ts-ignore
				navigate(`/chat/${senderId === user._id ? receiverId : senderId}?message=${_id}`)
			}

			return (
				<Box
					key={_id}
					cursor='pointer'
					role='link'
					onClick={clickHandler}
				>
					<HStack
						px={2}
						py={2.5}
						borderRadius='lg'
						_hover={{ bg: 'brand.blue.200' }}
					>
						<Avatar
							colorPalette='blue'
							name={name}
							size='lg'
							src={avatar}
						/>
						<Stack
							gap='1'
							w='full'
						>
							<Text fontWeight='medium'>{name}</Text>
							<HStack
								color='fg.muted'
								h='20px'
								w='full'
								overflow='hidden'
								justifyContent='space-between'
							>
								<Box>
									<Highlight
										styles={{ bg: 'yellow' }}
										query={searchText}
									>
										{message}
									</Highlight>
								</Box>
								<Text
									textStyle='sm'
									color='brand.grey.250'
								>
									{extractTime(createdAt)}
								</Text>
							</HStack>
						</Stack>
					</HStack>
					{index < messages.length - 1 && <Separator borderColor='brand.grey.100' />}
				</Box>
			)
		})
	}

	return (
		<DialogRoot
			placement={{ base: 'center', md: 'top' }}
			scrollBehavior='inside'
			initialFocusEl={() => inputRef.current}
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DialogTrigger asChild>
				<Box
					maxWidth={{ md: '230px', lg: '365px' }}
					w={{ md: 'full' }}
				>
					<Button
						fontWeight='normal'
						variant={{ base: 'ghost', md: 'subtle' }}
						_hover={{ md: { bg: 'gray.200' } }}
						w='full'
						borderRadius={{ base: 'md', md: '3xl' }}
						color='brand.grey.250'
						justifyContent='start'
						px={{ base: 2, md: 4, lg: 6 }}
						gap={4}
						disabled={isOffline}
					>
						<LuSearch />
						<Text hideBelow='md'>Search...</Text>
					</Button>
				</Box>
			</DialogTrigger>
			<DialogContent>
				<DialogBody p={1}>
					<Input
						onChange={handleSearchTextChange}
						ref={inputRef}
						type='text'
						placeholder='Search in messages'
					/>
					<Stack gap={0}>
						{isLoading && renderLoadingSkeleton()}
						{!isLoading && messages.length > 0 && renderResults()}
						{!isLoading && messages.length === 0 && debouncedSearchText.length > 0 && renderEmptyState()}
					</Stack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default SearchModal
