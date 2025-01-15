import { Box, HStack, Input, Stack, Text, Highlight, Skeleton, Separator } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { GoInbox } from 'react-icons/go'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import useDebounce from '@hooks/useDebounce.ts'
import { useFindMessagesMutation, useGetChatsQuery } from '@store/chat/chatApi.ts'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'
import { useSelector } from 'react-redux'
import { selectUser } from '@store/user/userSlice.ts'
import { extractTime } from '@utils/exactTime.ts'

const SearchModal = () => {
	const [searchText, setSearchText] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const user = useSelector(selectUser)

	const { participants } = useGetChatsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			participants: data?.map((item: any) => item.participant),
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
		return messages.map(({ _id, message, senderId, receiverId, createdAt }: any, index: number) => {
			const name = senderId === user._id ? 'You' : participants.find((item: any) => item._id === senderId).name
			const avatar =
				senderId === user._id ? user.avatar : participants.find((item: any) => item._id === senderId).avatar || ''

			const link = `/chat/${senderId === user._id ? receiverId : senderId}#${_id}`

			return (
				<Box key={_id}>
					<Link
						key={_id}
						to={link}
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
					</Link>
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
