import { FaPlus } from 'react-icons/fa6'
import { Box, Text, Input, Stack, HStack, Flex, Separator } from '@chakra-ui/react'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import useDebounce from '@hooks/useDebounce.ts'
import { useFindUsersByNameMutation } from '@features/user/userApi.ts'
import NewChatModalLoadingState from '@features/chat/components/NewChatModal/NewChatModalLoadingState.tsx'
import NewChatModalEmptyState from '@features/chat/components/NewChatModal/NewChatModalEmptyState.tsx'
import { IUser } from '@types'

const NewChatModal: FC<{ disabled: boolean }> = ({ disabled }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const [findUsersByName, { isLoading, data: results = [] }] = useFindUsersByNameMutation()
	const debouncedSearchQuery = useDebounce(searchQuery, 500)

	useEffect(() => {
		if (debouncedSearchQuery.length > 0) {
			findUsersByName(debouncedSearchQuery)
		}
	}, [debouncedSearchQuery, findUsersByName])

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value.trim())
	}

	const renderResults = () =>
		results.map(({ name, _id, avatar, email }: IUser, index: number) => (
			<Box key={_id}>
				<Link to={`/chat/${_id}`}>
					<Flex
						className='group'
						alignItems='center'
						justifyContent='space-between'
						_hover={{ bg: 'brand.blue.200' }}
						pr={4}
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
							<Stack gap={0}>
								<Text fontWeight='medium'>{name}</Text>
								<Text
									color='fg.muted'
									textStyle='sm'
								>
									{email}
								</Text>
							</Stack>
						</HStack>
						<Text
							_groupHover={{ textDecoration: 'underline' }}
							fontWeight='medium'
							color='brand.status'
						>
							Message
						</Text>
					</Flex>
				</Link>
				{index < results.length - 1 && <Separator borderColor='brand.grey.100' />}
			</Box>
		))

	return (
		<DialogRoot
			placement={{ base: 'center', md: 'top' }}
			scrollBehavior='inside'
			initialFocusEl={() => inputRef.current}
		>
			<DialogTrigger asChild>
				<Button
					w='full'
					maxWidth='136px'
					size='sm'
					disabled={disabled}
				>
					<FaPlus />
					New Chat
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogBody p={1}>
					<Input
						id='searchUsers'
						onChange={handleSearchChange}
						ref={inputRef}
						type='text'
						placeholder='Enter user name'
					/>
					<Stack
						gap={0}
						data-testid='newChatStack'
					>
						{isLoading && <NewChatModalLoadingState />}
						{!isLoading && results.length > 0 && renderResults()}
						{!isLoading && results.length === 0 && debouncedSearchQuery.length > 0 && (
							<NewChatModalEmptyState searchQuery={searchQuery} />
						)}
					</Stack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default NewChatModal
