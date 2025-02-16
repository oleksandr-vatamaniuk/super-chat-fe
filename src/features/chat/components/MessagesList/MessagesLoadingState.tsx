import { Stack, Skeleton, HStack } from '@chakra-ui/react'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'

const MessagesLoadingState = () => {
	return (
		<>
			<HStack
				mb='2'
				gap='2'
				justifyContent='end'
				alignItems='end'
				data-testid='skeleton-stack'
			>
				<Stack alignItems='end'>
					<Skeleton
						height='20px'
						width='100px'
					/>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
				<SkeletonCircle
					visibility='hidden'
					size='10'
				/>
			</HStack>
			<HStack
				mb='2'
				gap='2'
				justifyContent='end'
				alignItems='end'
			>
				<Stack alignItems='end'>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
				<SkeletonCircle
					visibility='hidden'
					size='10'
				/>
			</HStack>
			<HStack
				mb='2'
				gap='2'
				justifyContent='end'
				alignItems='end'
			>
				<Stack alignItems='end'>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
				<SkeletonCircle size='10' />
			</HStack>

			<HStack
				mb='2'
				gap='2'
				justifyContent='start'
				alignItems='end'
			>
				<SkeletonCircle
					visibility='hidden'
					size='10'
				/>
				<Stack alignItems='start'>
					<Skeleton
						height='20px'
						width='100px'
					/>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
			</HStack>
			<HStack
				mb='2'
				gap='2'
				justifyContent='start'
				alignItems='end'
			>
				<SkeletonCircle size='10' />
				<Stack alignItems='start'>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
			</HStack>
			<HStack
				mb='2'
				gap='2'
				justifyContent='end'
				alignItems='end'
			>
				<Stack alignItems='end'>
					<Skeleton
						height='20px'
						width='100px'
					/>
					<Skeleton
						height='60px'
						w='240px'
					/>
				</Stack>
				<SkeletonCircle size='10' />
			</HStack>
		</>
	)
}

export default MessagesLoadingState
