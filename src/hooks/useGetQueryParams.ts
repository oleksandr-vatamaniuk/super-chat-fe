import { useLocation } from 'react-router-dom'

export default function useGetQueryParams() {
	return new URLSearchParams(useLocation().search)
}
