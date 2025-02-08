import { FaPlus } from 'react-icons/fa6'
import { Box, Text, Input, Stack, HStack, Flex, Separator, Skeleton } from '@chakra-ui/react'
import { GoInbox } from 'react-icons/go'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'
import useDebounce from '@hooks/useDebounce.ts'
import { useFindUsersByNameMutation } from '@features/user/userApi.ts'

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
					{searchQuery}
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

	const renderResults = () =>
		results.map(({ name, _id, avatar, email }: any, index: number) => (
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
						onChange={handleSearchChange}
						ref={inputRef}
						type='text'
						placeholder='Enter user name'
					/>
					<Stack gap={0}>
						{isLoading && renderLoadingSkeleton()}
						{!isLoading && results.length > 0 && renderResults()}
						{!isLoading && results.length === 0 && debouncedSearchQuery.length > 0 && renderEmptyState()}
					</Stack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default NewChatModal
