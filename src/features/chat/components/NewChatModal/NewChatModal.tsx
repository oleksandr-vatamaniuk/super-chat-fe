import { FaPlus } from 'react-icons/fa6'
import { Box, Text, Input, Stack, HStack, Flex, Separator } from '@chakra-ui/react'
import { GoInbox } from 'react-icons/go'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'

const NewChatModal = () => {
	const [searchQuery] = useState('Pablo Doe')
	const [results] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	return (
		<DialogRoot
			placement={{ base: 'center', md: 'top' }}
			scrollBehavior='inside'
			initialFocusEl={() => ref.current}
		>
			<DialogTrigger asChild>
				<Button
					w='full'
					maxWidth='136px'
					size='sm'
				>
					<FaPlus />
					New Chat
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogBody p={1}>
					<Input
						ref={ref}
						type='text'
						placeholder='Enter user name'
					/>
					<Stack
						py={1}
						gap={0}
					>
						<Link to='/'>
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
										name={'John Doe'}
										size='lg'
										src={''}
									/>
									<Stack gap='0'>
										<Text fontWeight='medium'>{'John Doe'}</Text>
										<Text
											color='fg.muted'
											textStyle='sm'
										>
											{'johnDoe@gmail.com'}
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
						<Separator borderColor='brand.grey.100' />
						<Link to='/'>
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
										name={'John Doe'}
										size='lg'
										src={''}
									/>
									<Stack gap='0'>
										<Text fontWeight='medium'>{'John Doe'}</Text>
										<Text
											color='fg.muted'
											textStyle='sm'
										>
											{'johnDoe@gmail.com'}
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
						<Separator borderColor='brand.grey.100' />
						<Link to='/'>
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
										name={'John Doe'}
										size='lg'
										src={''}
									/>
									<Stack gap='0'>
										<Text fontWeight='medium'>{'John Doe'}</Text>
										<Text
											color='fg.muted'
											textStyle='sm'
										>
											{'johnDoe@gmail.com'}
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
					</Stack>

					{results && (
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
					)}
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default NewChatModal
