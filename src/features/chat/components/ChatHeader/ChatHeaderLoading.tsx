import { HStack, Skeleton, Stack } from '@chakra-ui/react'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'

const ChatHeaderLoading = () => (
	<HStack>
		<SkeletonCircle
			size='12'
			data-testid='skeleton-circle'
		/>
		<Stack>
			<Skeleton
				height='26px'
				w='100px'
				data-testid='skeleton-text-lg'
			/>
			<Skeleton
				height='16px'
				w='40px'
				data-testid='skeleton-text-sm'
			/>
		</Stack>
	</HStack>
)

export default ChatHeaderLoading
