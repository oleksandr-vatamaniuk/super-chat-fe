import { Box, HStack, Input, Stack, Text, Highlight } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { GoInbox } from 'react-icons/go'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'

const Search = () => {
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
						ref={ref}
						type='text'
						placeholder='Search in messages'
					/>
					<Stack
						py={1}
						gap={0}
					>
						<Link to='/'>
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
									<Box
										color='fg.muted'
										h='20px'
										w='full'
										overflow='hidden'
									>
										<Highlight
											styles={{ bg: 'yellow' }}
											query='Lorem Ipsum'
										>
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
											type and scrambled it to make a type specimen book. It has survived not only five centuries, but
											also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
											the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
											with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
										</Highlight>
									</Box>
								</Stack>
							</HStack>
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

export default Search
