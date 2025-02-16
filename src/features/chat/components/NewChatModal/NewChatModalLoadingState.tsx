import { HStack, Separator, Skeleton, Stack } from '@chakra-ui/react'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'

const NewChatModalLoadingState = () => (
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

export default NewChatModalLoadingState
